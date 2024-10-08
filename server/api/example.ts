/**
 * Nuxt can now be used like a backend server
 * The following handles All http methods (get,post,put etc...) for the api path  http://localhost:xxxx/api/example
 */

export default defineEventHandler((event) => {
	// You can do anything like a backend server here
	console.log(event)

	return {
		title: "Mount Everest",
		description:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point",
		height: "8,848 m",
		countries: ["China", "Nepal"],
		continent: "Asia",
		image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Everest_kalapatthar.jpg/600px-Everest_kalapatthar.jpg",
		dir: "/mountains",
		path: "/mountains/mount-everest",
		slug: "mount-everest",
		updatedAt: "2020-12-11T15:40:35.000Z"
	}
})
