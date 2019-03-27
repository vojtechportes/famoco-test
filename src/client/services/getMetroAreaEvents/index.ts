import axios, { AxiosError, AxiosResponse } from "axios";
import config from "src/client/config";

export interface IEventsData {
  resultsPage?: {
    status: string;
    perPage: number;
    page: number;
    results: {
      event?: IEventsDataItem[];
    };
    totalEntries: number;
  };
}

export interface IEventsDataItem {
  ageRestriction: any;
  displayName: string;
  flaggedAsEnded: boolean;
  id: number;
  location: { 
    city: string;
    lat: number | null;
    lng: number | null;    
  };
  performance: IEventsDataItemPerformance[];
  popularity: number;
  start: {
    date: string;
    datetime: string | null;
    time: string | null;
  };
  status: string;
  type: string;
  uri: string;
  venue: {
    displayName: string;
    id: number;
    lat: number | null;
    lng: number | null;
    metroArea: {
      country: {
        displayName: string;
      };
      displayName: string;
      id: number;
      uri: string;
    };
    uri: string; 
  }
}

export interface IEventsDataItemPerformance {
    id: number;
    displayName: string;
    billing: string;
    billingIndex: number;
    artist: {
      displayName: string;
      id: number;
      identifier: IEventsDataItemPerformanceIdentifier[];
      uri: string;
    };  
}

export interface IEventsDataItemPerformanceIdentifier {
  href: string;
  mbid: string;
}

export const getMetroAreaEvents = (areaID: number, limit: number = 10, page: number = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${config.API_BASE}/metro_areas/${areaID}/calendar.json?apikey=${
          config.API_KEY
        }&per_page=${limit}&page=${page}`
      )
      .then((response: AxiosResponse<IEventsData>) => {
        resolve(response);
      })
      .catch((reason: AxiosError) => {
        reject(reason);
      });
  });
};
