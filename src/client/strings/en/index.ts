import { IStrings } from "../";

const Strings: IStrings = {
	components: {
		search: {
			placeholder: "Try Brussels or Belgium for example",
			errors: {
				empty: "Search field must not be empty",
				tooShort: "Type at least two characters"
			}
		},
    loadMore: {
      value: "Load more"
    },
    appBar: {
      title: "EventsApp",
      menuTitle: "Menu"
    }
	},
  scenes: {
    event: {
      venueHd: "Venue",
      yes: "YES",
      no: "NO",
      ageRestriction: "Age restriction",
      hasEnded: "Has ended",
      components: {
        moreEvents: {
          value: "See more events around"
        }
      }
    },
    homepage: {
      components: {
        list: {
          city: "City",
          country: "Country",
          regionId: "Region ID"
        }
      }
    },
    region: {
      hd: "Upcoming events in",
      components: {
        card: {
          titleSeparator: " and ",
          dateFormat: "DD/MM/YYYY"
        },
        cardButton: {
          value: "Event detail"
        }
      }
    }
  }
};

export default Strings;
