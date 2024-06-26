<!-- VERSIONING: EACH COMMIT / PR ADDS 1 TO THE DEV, UNTIL THE PROGRAM GETS TO A POINT WHERE IT'S ACTUALLY USABLE. FROM THERE, PATCHES & FIXES WILL INCREASE 0.0.X, AND FEATURE-PACKED UPDATES WILL INCREASE 0.X.0.-->
## OVS 2
# 03/06/2024
- Made the repo a public archive - will create OVS 3 soon.

# 2.1.1
- Made another general (and harder) effort to make the code more readable.

# 2.1.0
- Made a general effort to make the code more readable.
- Added search.
- Removed the footer from the homepage, so it looks cleaner.

# 2.0.3
- Fixed in-app version displaying.
- Fixed an error where if you create a 1st item on a SET, the sum of the total would not be done properly due to the JSON storing the number as a "string".
- Replaced "starter data" with an empty JSON so the user has less problems to get started.
- Added "No items!" thingy.
- Improvements to styling.

# 2.0.2
- Fixed an error that made the program think it has to update when it doesnt have to.

# 2.0.1
- Fixed an error where creating an item broke the Totals.

# 2.0.0 (DEV-08)
- Now it does auto update (kinda).
- **AUTHORISED TO PASS FROM DEV TO STABLE.**

# 2.0.0 (DEV-07)
- The app finally compiles :]
- Made some more adjustments.
- Commented the search bar, to make the program look cleaner (it didn't work anyways).
- Few changes.
- Started works on updates.

# 2.0.0 (DEV-06)
- Adjustments (trying to make the app compile).

# 2.0.0 (DEV-05)
- Now you can delete items aswell.
- At this point, the app is more or less usable.

# 2.0.0 (DEV-04)
- Now you can delete SETs aswell.

# 2.0.0 (DEV-03)
- Now you can create items aswell.

# 2.0.0 (DEV-02)
- New, more organised file structure.
- Started working on the translation system (not finished, obviusly).
- Replaced Bootrstrap's with standard HTML's form validation.
- A few fixes & tweaks here and there.
- Added `CHANGELOG`.
- Removed license from `package.json`.

# 2.0.0 (DEV-01)
- Rewritten the program in ElectronJS.

## OVS 1 (from [here](https://github.com/ZakaHaceCosas/ovs-legacy))
# 1.1
- Renewed the project's file structure, making it more organised.
- Fixed a bug where all SETs would show the total of the 1st one only.
- Improvements to styling.
- Fixed the search bar clearing itself on search.
- Added "No results found" to the search tab.
- Fixed search taking " " as an argument and showing everything
- HALF fixed negative value processing
> **KNOWN ISSUES**
    - Still having problems with negative values
- Renamed variables from Internal naming system to a more understandable thing
- Added a favicon
- Fixed update-data ending screen showing "*" instead of the name of the product.
- Small overall changes

# 1.0
- Main release