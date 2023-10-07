# Week 4 - Part 1

## Overview of What We Should Complete This Week

[Watch the video](https://drive.google.com/file/d/1e3DyAh2ghi937QBP9T0FciLloWB9MXrg/view?usp=sharing)

Based on the example above, we need to build the index page first.

Our designer has created three beautifully designed pages, which you can find at [figma](https://www.figma.com/file/sKhc4A0Gi427u1I5leT5ug/STYLiSH).

We also have logos and icons ready to use, which you can download from [this link](https://s3.amazonaws.com/appworks-school-stylish/images.zip).

## What should we do?

1. Create the index.html page with responsive design (the breakpoint is set to 1280px).
2. Add an icon hover effect:
   - Use a color effect when users hover over the shopping cart and profile icons on each page.
3. Add a sliding feature for marketing campaigns:
   - Change to the corresponding slide when users click on a dot.
   - Change to the next slide every 5 seconds automatically.
   - Stop the timer when users hover over a dot.
   - Restart the timer when users move their cursor out of the dot.
4. Connect to our backend service and add the following features to the index page using React Query:
   - `List Products`: Display products from your backend.
   - `Filter Products by Category`: Allow users to select categories and display the corresponding products after filtering.
   - `Search Products`: Allow users to search for products based on their title.

## Advanced Optional

Here's some features to improve our user experience of page:

- Display the product list with infinite scrolling. When users scroll down to the bottom of the page, we'll automatically load and show the next page.
- Add a skeleton loader to show that the page is loading while waiting for the network response.
- If you haven't use Typescript in your project, you can try utilize Typescript for better typing precision.

## 💡 Recap
- Understanding HTML, CSS, JavaScript basic usage.
- When will you use setInterval, and how about setTimeout?
- What is fetch api and how React Query improve fetching data?
- What is elastic search? Is there any way to improve searching?
- What is Data-Driven UI? How did you utilize that in your project?
- What is SOLID Principle in FE Development?
