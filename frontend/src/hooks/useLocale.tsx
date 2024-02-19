import { useState, useEffect } from 'react';

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
        console.error('Error getting user location:', err);
      }
    };

    if (navigator.geolocation) {
      fetchLocale();
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return { locale };
};

export default useLocale;
