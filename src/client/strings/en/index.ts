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
      menuTitle: "Menu",
      drawer: {
        list: {
          homepage: "Homepage"
        }
      }
    }
	},
  scenes: {
    event: {
      noResults: "Hmmm, this event doesn't exist :/",
      venueHd: "Venue",
      description: "Description",
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
      noResults: "Seems like we don't have this place in our system :(",
      components: {
        list: {
          city: "City",
          country: "Country",
          regionId: "Region ID"
        }
      }
    },
    region: {
      noResults: "There are no events in ",
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
