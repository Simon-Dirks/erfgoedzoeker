# Styling Erfgoedzoeker

Erfgoedzoeker uses [TailwindCSS](https://tailwindcss.com/) for styling, with [DaisyUI](https://daisyui.com/) as the component library.

## Using Tailwind Classes

Throughout the application, you can use Tailwind utility classes directly in component templates.

For example:

```html
<div class="bg-app-bg p-4 rounded-lg">
  <h1 class="text-primary font-sans text-2xl">Heritage Object</h1>
</div>
```

::: tip
Tailwind strips all default browser styles, so elements like `<h2>` won't have any styling unless you add utility classes.
:::

## DaisyUI Components

DaisyUI provides pre-styled components like buttons, cards, and modals. Refer to the [DaisyUI documentation](https://daisyui.com/components/) for available components and their usage.

## Themes

Erfgoedzoeker includes three pre-configured themes: **light** (default), **dark**, and **erfgoedzoeker-purple**.

<video controls>
  <source src="./theme-switching.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<span class="media-caption">Video: Switching between themes</span>

Configuration is CSS-first: themes are defined in `src/styles.css`.

### Adding or Modifying Themes

Each theme is registered with the `@plugin "daisyui"` block, then defined with its own styles via `@plugin "daisyui/theme"`.

**`light` and `dark` customize DaisyUI's built-in themes of the same name.** DaisyUI [inherits any value you don't override](https://daisyui.com/docs/themes/#how-to-customize-an-existing-theme) from the built-in theme when the `name` matches exactly, so only the values that differ from the DaisyUI default need to be listed:

```css
@plugin 'daisyui' {
  themes:
    light --default,
    dark,
    erfgoedzoeker-purple;
}

@plugin 'daisyui/theme' {
  name: 'light';
  default: true;
  --color-primary: #007994;
  --color-primary-content: #ffffff;
  --radius-field: 9999px;
}
```

See the [DaisyUI Theme Generator](https://daisyui.com/theme-generator/) for more customization options.
