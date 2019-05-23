import { writable } from "svelte/store";

const meetups = writable([]);

const customMeetupsStore = {
	subscribe: meetups.subscribe,
	addMeetup: meetupData => {
		meetups.update(items => [meetupData, ...items]);
	},
	updateMeetup: (id, meetupData) => {
		meetups.update(items => {
			const updateMeetupIndex = items.findIndex(i => i.id === id);
			return [
				...items.slice(0, updateMeetupIndex),
				{ ...items[updateMeetupIndex], ...meetupData },
				...items.slice(updateMeetupIndex + 1)
			];
		});
	},
	deleteMeetup: id => {
		meetups.update(items => {
			return items.filter(i => i.id !== id);
		});
	},
	toggleFavorite: id => {
		meetups.update(items => {
			const updateMeetupIndex = items.findIndex(i => i.id === id);
			const updatedMeetup = { ...items[updateMeetupIndex] };
			updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
			return [
				...items.slice(0, updateMeetupIndex),
				updatedMeetup,
				...items.slice(updateMeetupIndex + 1)
			];
		});
	}
};

export default customMeetupsStore;
