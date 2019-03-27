import axios, { AxiosError, AxiosResponse } from "axios";
import config from "src/client/config";

export interface ILocationData {
  resultsPage?: {
    status: string;
    page: number;
    perPage: number;
    results: {
      location?: ILocationDataItem[];
    };
    totalEntries: number;
  };
}

export interface ILocationDataItem {
  city: {
    country: {
      displayName: string;
    };
    displayName: string;
    lat: number;
    lng: number;
  };
  metroArea: {
    displayName: string;
    id: number;
    lat: number;
    lng: number;
    uri: string;
  };
}

export const getLocation = (
  value: string | { lat: number; lng: number },
  limit: number = 10,
  page: number = 1
) => {
  return new Promise((resolve, reject) => {
    let locationString: string;
    let locationStringKey: string;

    if (typeof value === "string") {
      locationStringKey = "query";
      locationString = encodeURIComponent(value);
    } else {
      locationStringKey = "location";
      locationString = `geo:${value.lat},${value.lng}`;
    }

    axios
      .get(
        `${
          config.API_BASE
        }/search/locations.json?${locationStringKey}=${locationString}&apikey=${
          config.API_KEY
        }&per_page=${limit}&page=${page}`
      )
      .then((response: AxiosResponse<ILocationData>) => {
        resolve(response);
      })
      .catch((reason: AxiosError) => {
        reject(reason);
      });
  });
};
