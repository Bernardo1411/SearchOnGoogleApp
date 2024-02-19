import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useLocale = () => {
  const [locale, setLocale] = useState<string>('');

  useEffect(() => {
    const fetchLocale = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          },
        );

        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        );

        const data = await response.json();
        const { country_code: countryCode } = data.address;

        // Use the countryCode to determine the country
        // You can perform any other logic here
        setLocale(countryCode);
      } catch (err) {
        toast.error('Erro ao acessar a localização do usuário.', {
          autoClose: 4000,
          hideProgressBar: true,
        });
      }
    };

    if (navigator.geolocation) {
      fetchLocale();
    } else {
      toast.error('Geolocalização não suportada neste navegador.', {
        autoClose: 4000,
        hideProgressBar: true,
      });
    }
  }, []);
  console.log(locale);
  return { locale };
};

export default useLocale;
