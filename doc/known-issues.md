# Known Issues

- Due to there is a bug in yarn with string-width/index.js so we need to add following to ```package.json```
    ```json
      "resolutions": {
        "jackspeak": "2.1.1"
        }
    ```
    - visit [here](https://github.com/storybookjs/storybook/issues/22431) for more information
    - if it is fixed then please remove the extra lines in ```package.json```