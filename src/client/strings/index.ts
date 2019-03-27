import * as React from "react";

export interface IStrings {
	components: {
		search: {
			placeholder: string;
			errors: {
				empty: string;
				tooShort: string;
			}
		};
    loadMore: {
      value: string;
    };
    appBar: {
      title: string;
      menuTitle: string;
    }    
	};
  scenes: {
    event: {
      venueHd: string;
      yes: string;
      no: string;
      ageRestriction: string;
      hasEnded: string;
      components: {
        moreEvents: {
          value: string;
        }
      }
    }
    homepage: {
      components: {
        list: {
          city: string;
          country: string;
          regionId: string;
        }
      }
    };    
    region: {
      hd: string;
      components: {
        card: {
          titleSeparator: string;
          dateFormat: string;
        };
        cardButton: {
          value: string;
        }
      }
    }
  }
}

export { default as EN } from "./en/index";
export const StringsContext = React.createContext({ strings: {} as IStrings });
