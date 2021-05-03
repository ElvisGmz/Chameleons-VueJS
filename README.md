# Chameleons for Vue.JS

Create a beautiful cut effect to your fixed element and change its color with cut effect when scrolling. Zero dependecy.

![https://res.cloudinary.com/superfolio/image/upload/v1620078437/ezgif.com-gif-maker_lumagl.gif](https://res.cloudinary.com/superfolio/image/upload/v1620078437/ezgif.com-gif-maker_lumagl.gif)

# Install

```bash
npm install chameleons-vue
```

# Usage

### Required Attributes

- Apply the attribute `chameleons` to parent element for your fixed element, for apply the effect.
- `chameleons-tag` for activate your section element

### Option Atributtes

- Use `chameleons-apply="your_class"` to apply these styles to your fixed element when the element with this attribute passes below in the scroll
- `chameleons-data='{"fixedName":"your_class"}'` for add class to a specific fixed element.
- The attribute `chameleons-name="fixedName"` is use for add one name for your parent of the Fixed Element and you can use the next atributte for apply class.

### NavBar.vue

```html
<template>
	<!-- Parent of the fixed element -->
	<header chameleons chameleons-name="MyFixedNav">
		<nav class="fixed">
			<!-- Your elements or content here -->
		</nav>
	</header>
</template>
```

### App.vue

```html
<template>
	<!-- Vue Component - Fixed Element -->
	<NavigationBar />

	<!-- Your Content Sections -->
	<section chameleons-tag chameleons-apply="your_class">
		<!-- Your Content Here -->
	</section>
	<section chameleons-tag chameleons-data='{"MyFixedNav":"your_class"}'>
		<!-- Your Content Here -->
	</section>
</template>

<script>
	import Vue from "vue";
	import Chameleons from "chameleons-vue";
	import NavigationBar from "./components/NavigationBar";
	export default {
		name: "MyComponent",
		components: {
			NavigationBar,
		},
		updated(){
			Chameleons(Vue, NavigationBar);
		},
	}
</script>

<style>
.your_class{
	background-color: #21212C;
	color: white;
}

.your_other_class{
	background-color: white;
	color: #21212C;
}
</style>
```

> If for some reason you have problems applying `z-index` use the CSS class `non-index` or `chameleons-visible` for fix default `overflow-hidden` in your section. Chameleons require as params `Vue` and `VueComponent` for work.

# Reactivity

> If you want to maintain the reactivity of your fixed element you can create a global state

# How to use with TailwindCSS

You can do it using apply inside the class you apply in `chameleons-apply="your_class"`

### CSS File:

```css
.your_class{
	@apply bg-dark-700 rounded; 
}

.your_class h1{
	@apply text-xl font-bold; 
}

.your_class p{
	@apply text-justify;
}
```

### In your HTML or Template:

```html
<template>
	<!-- Your fixed parent -->
	<header chameleons>
		<nav class="fixed">
			<!-- Your elements or content here -->
		</nav>
	</header>

	<!-- Your Content Sections -->
	<section chameleons-apply="your_class_with_tailwind">
		<!-- Your Content Here -->
	</section>
	<section chameleons-apply="your_class_with_tailwind">
		<!-- Your Content Here -->
	</section>
</template>
```