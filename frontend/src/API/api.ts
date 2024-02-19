// create function to post data on the API
export async function postSearch(data: object): Promise<object[]> {
  try {
    const rawResponse = await fetch('http://localhost:5001/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!rawResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const response = await rawResponse.json();

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// create function to get data from the API
export async function getSearches(): Promise<object[]> {
  try {
    const rawResponse = await fetch('http://localhost:5001/search');

    if (!rawResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const response = await rawResponse.json();

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
