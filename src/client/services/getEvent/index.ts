import axios, { AxiosError, AxiosResponse } from "axios";
import config from "src/client/config";

export interface IEventData {
  resultsPage?: {
    status: string;
    results: {
      event: IEventDataDetail;
    };
  };
}

export interface IEventDataDetail {
  ageRestriction: any;
  displayName: string;
  flaggedAsEnded: boolean;
  id: number;
  location: {
    city: string;
    lat: null | number;
    lng: null | number;
  };
  performace: IEventDataPerformance[];
  popularity: number;
  start: {
    date: string;
    datetime: null | string;
    time: null | string;
  };
  status: string;
  type: string;
  uri: string;
  venue: {
    capacity: null | number;
    city: {
      country: {
        displayName: string;
      };
      displayName: string;
      id: number;
      uri: string;
    };
    description: string;
    displayName: string;
    id: number;
    lat: null | number;
    lng: null | number;
    metroArea: {
      country: {
        displayName: string;
      };
      displayName: string;
      id: number;
      uri: string;
    };
    phone: null | string;
    street: string;
    uri: string;
    website: null | string;
    zip: string;
  };
}

export interface IEventDataPerformance {
  artist: {
    displayName: string;
    id: number;
    identifier: IEventDataPerformanceIdentifier[];
    uri: string;
    billing: string;
    billingIndex: number;
  };
}

export interface IEventDataPerformanceIdentifier {
  href: string;
  mbid: string;
}

export const getEvent = (eventID: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.API_BASE}/events/${eventID}.json?apikey=${config.API_KEY}`)
      .then((response: AxiosResponse<IEventData>) => {
        resolve(response);
      })
      .catch((reason: AxiosError) => {
        reject(reason);
      });
  });
};
