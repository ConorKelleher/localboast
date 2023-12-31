# LocalBoast - Make your React App a bit more extra.

![BannerImage](assets/icons/ColourSolidWide.jpeg)

This is the full LocalBoast React library.

- GitHub: https://github.com/ConorKelleher/LocalBoast
- npm: https://www.npmjs.com/package/LocalBoast

# To Install

Install the entire module as a dependency from npm as normal:

```
npm i localboast
```

or

```
yarn add localboast
```

**Note**: As this library is intended to be all-inclusive, it has no dependencies other than peer-dependencies of `react` and `react-dom`. This means it should have minimal compatibility issues with any app.

# To Use

This library includes a range of [**Components**](https://github.com/ConorKelleher/localboast/tree/main/src/components), [**Hooks**](https://github.com/ConorKelleher/localboast/tree/main/src/hooks) and [**Helpers**](https://github.com/ConorKelleher/localboast/tree/main/src/helpers). These are all able to be used independently and are intended to provide quick access to powerful functionality.

Each of the core folders provides an index of the exported contents, allowing you to directly import from specific places in the app, e.g.:

```
import { Truncate } from "localboast/dist/components"
import { useMove } from "localboast/dist/hooks"
import { cx } from "localboast/dist/helpers"
```

All of these exported elements are also exported from the root index, allowing for cleaner imports like:

```
import { Truncate, useMove, cx } from "localboast"
```

# Docs/Example

This library is developed and documented through storybook.
A static build of this storybook app can be found at https://LocalBoast.com/docs
(Note: that entire website is built as a showcase of sorts for the LocalBoast library, but the `/docs` route is a direct embed of the full storybook app).

While I intend on keeping the above public build up to date with the functionality of this library, I cannot guarantee that it'll always be up to date. If you need docs for the latest and greatest, you can run it locally by cloning this repository and running `yarn run storybook`

# Live Development

In an attempt to be somewhat unique, the development of this project is largely happening live on stream over on [Twitch](https://twitch.tv/localboast1) or on [YouTube Live](http://youtube.com/channel/UCt-IaL4qQsOU6_rbS7zky1Q/live). A record of all past live streams and other video documentation can also be found at the above YouTube channel.

# Donations

I'm working on this instead of having a job that pays me. So for the time being, I'm going to be funded through generosity alone. If you're feeling generous, here are some links:

- Direct Tip (will show up on stream if I'm live): https://streamelements.com/localboast1/tip
- Patreon: https://patreon.com/LocalBoast

# License

MIT © [ConorKelleher](https://github/com/ConorKelleher)
