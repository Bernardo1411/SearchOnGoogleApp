package main

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"encoding/json"
	"github.com/PuerkitoBio/goquery"
)

type link struct {
	Title       string
	Description string
	Link        string
}

func main() {
	http.HandleFunc("/search", handleSearch)
	fmt.Println("Listening on port 5002...")
	http.ListenAndServe(":5002", nil)
}

type SearchRequest struct {
	Locale    string `json:"locale"`
	Frequency string `json:"frequency"`
	Keywords  string `json:"keywords"`
}

func handleSearch(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	decoder := json.NewDecoder(r.Body)
    var searchReq SearchRequest
    err := decoder.Decode(&searchReq)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

	results := searchOnGoogle(searchReq.Locale, searchReq.Frequency, searchReq.Keywords)

	sendResultsToBackend(w, results)
}

func searchOnGoogle(locale, frequency string, keywords string) []link {
	searchURL := "https://www.google.com/search?" +
		"&hl=" + url.QueryEscape(locale) +
		"&tbs=qdr:" + url.QueryEscape(frequency) +
		"&q=" + url.QueryEscape(keywords)

	resp, err := http.Get(searchURL)
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}
	defer resp.Body.Close()

	// Read the response body
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}

	results := extractResultsFromBody(string(bodyBytes))

	return results
}

func extractResultsFromBody(body string) []link {
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(body))
	if err != nil {
		fmt.Println(err)
	}

	var results []link

	doc.Find("div.Gx5Zad.fP1Qef.xpd.EtOod.pkphOe").Each(func(i int, s *goquery.Selection) {
		if i >= 5 {
			return
		}

		var link link

		link.Title = s.Find("h3.zBAuLc.l97dzf div.BNeawe.vvjwJb.AP7Wnd").Text()

		link.Description = s.Find("div.v9i61e").Text()

		unformattedLink := s.Find("div.BNeawe.UPmit.AP7Wnd.lRVwie").Text()

		link.Link = strings.Split(unformattedLink, " ")[0]

		results = append(results, link)
	})

	return results
}

func sendResultsToBackend(w http.ResponseWriter, results []link) {
	jsonData, err := json.Marshal(results)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	_, err = w.Write(jsonData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
