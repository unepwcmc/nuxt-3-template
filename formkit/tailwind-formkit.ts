// The following Tailwind theme aspires to be a reproduction of the
// default optional Genesis CSS theme that ships with FormKit
// https://formkit.com/guides/create-a-tailwind-theme

/*
   - some of the styles are defined in assets/extended-tailwind-styles.pcss
   - You only need to define these styles if you want to have a 'global' style for all your forkit input elements,
      - In other words, if you don't want all formkit elements to have the same style then you don't need to do anything to this file other than comment it out all examples below
*/
export default {
	global: {
		message: "text-red-default-colour" // in assets/extended-tailwind-styles.pcss
	},
	select: {
		wrapper: "text-wrapper", // in assets/extended-tailwind-styles.pcss
		input: "text-input" // in assets/extended-tailwind-styles.pcss
	},
	text: {
		wrapper: "text-wrapper", // in assets/extended-tailwind-styles.pcss
		input: "text-input" // in assets/extended-tailwind-styles.pcss
	},
	password: {
		wrapper: "text-wrapper", // in assets/extended-tailwind-styles.pcss
		input: "text-input"// in assets/extended-tailwind-styles.pcss
	},
	textarea: {
		wrapper: "text-wrapper", // in assets/extended-tailwind-styles.pcss
		input: "text-input--longer"// in assets/extended-tailwind-styles.pcss
	},
	radio: {
		legend: "mb-6",
		options: "flex gap-3",
		wrapper: " flex gap-3",
		input: "w-7 h-7",
		label: "text-xl"
	},
	button: {
		input: "button" // Defined in assets/css/components.pcss
	},
	submit: {
		input: "button"// Defined in assets/css/components.pcss
	},
	checkbox: {
		wrapper: "flex gap-2",
		input: "w-7 h-7"
	}
}
