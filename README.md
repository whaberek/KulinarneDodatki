# KulinarneDodatki

A Tampermonkey userscript that enhances the user experience on kwestiasmaku.com by adding interactive checkboxes to recipe ingredients.

## Features

- Adds checkboxes next to recipe ingredients
- Allows clicking on ingredients to mark them as used
- Checked ingredients are visually marked with a strikethrough and reduced opacity
- Checkbox states are preserved during the browser session
- Clean and intuitive user interface

## Installation

1. First, install the Tampermonkey browser extension:
   - [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. After installing Tampermonkey, click on this link to install the script:
   - [Install KulinarneDodatki](https://github.com/whaberek/KulinarneDodatki/raw/refs/heads/master/KulinarneDodatki.user.js)

   Alternatively, you can manually install the script:
   1. Open Tampermonkey dashboard (click on the Tampermonkey icon in your browser and select "Dashboard")
   2. Go to the "Utilities" tab
   3. Copy the raw content of `KulinarneDodatki.user.js`
   4. Paste it into the "Install from URL" or create a new script and paste the code

## Usage

1. Visit any recipe page on kwestiasmaku.com
2. You'll see checkboxes appear next to each ingredient
3. Click either the checkbox or the ingredient text to mark it as used
4. Checked ingredients will be visually marked with a strikethrough
5. Your checked items will be remembered during your browser session

## Development

To modify the script:
1. Open the Tampermonkey dashboard
2. Click on the "KulinarneDodatki" script
3. Make your changes
4. Save using Ctrl+S or Command+S

## License

This project is open source and available under the MIT License.

## Author

Wojciech Haberek 