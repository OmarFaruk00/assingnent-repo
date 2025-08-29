## Questions

1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?
Ans:getElementById  one element by ID
Since IDs should be unique on a page, it will only return a single element

getElementsByClassName all elements with a class
Returns an HTMLCollection, which is like a list of elements.

querySelector  first element matching a CSS selector
Very flexible because you can use classes, IDs, or even complex selectors.

querySelectorAll  all elements matching a CSS selector
Returns a NodeList, which is also like a list of elements.r

2. How do you **create and insert a new element into the DOM**?
Ans: To Create the element I can use document.createElement() like this:
const newDiv = document.createElement("div");

I can add text, classes, or other attributes to my element like this:
newDiv.textContent = "Hello World!";
newDiv.className = "my-div";

I can choose an existing element in the DOM where the new element should go like: 
const container = document.getElementById("container");

I Can use methods like .appendChild() or .prepend() to add the new element like:
container.appendChild(newDiv); // adds at the end
// or
container.prepend(newDiv); // adds at the beginning

3. What is **Event Bubbling** and how does it work?

Ans:Event Bubbling is how events move through the DOM tree when something happens like a click.A button inside a <div>, and that <div> is inside the <body>.
you click the button:

The event happens on the button first.

Then it "bubbles up" to the div.

Finally, it bubbles up to the body, and so on, until it reaches the root document.

This is why it’s called bubbling like bubbles rising up in water.
Example:
<body>
  <div id="parent">
    <button id="child">Click Me</button>
  </div>

  <script>
    document.getElementById("child").addEventListener("click", () => {
      console.log("Button clicked!");
    });

    document.getElementById("parent").addEventListener("click", () => {
      console.log("Div clicked!");
    });

    document.body.addEventListener("click", () => {
      console.log("Body clicked!");
    });
  </script>
</body>




4. What is **Event Delegation** in JavaScript? Why is it useful?
Ans:Event Delegation is a technique where instead of adding event listeners to every single child element, we have to add one event listener to the parent element.
Example:
<ul id="myList">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
  document.getElementById("myList").addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      console.log("You clicked:", event.target.textContent);
    }
  });
</script>


5. What is the difference between **preventDefault() and stopPropagation()** methods?
Ans: Difference between preventDefault() and stopPropagation()
Both methods are used inside event handlers, but they do different things:
1.preventDefault()
Stops the default action of an element from happening.

Example: A form submit button will not reload the page.

Example: A link (<a>) will not navigate to another page

<a href="https://google.com" id="myLink">Go to Google</a>

<script>
  document.getElementById("myLink").addEventListener("click", (event) => {
    event.preventDefault(); 
    console.log("Default action prevented!");
  });
</script>
2. stopPropagation()
Stops the event from bubbling up (so parent elements won’t get the event).
<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
  document.getElementById("child").addEventListener("click", (event) => {
    event.stopPropagation(); // stops bubbling
    console.log("Button clicked only!");
  });

  document.getElementById("parent").addEventListener("click", () => {
    console.log("Parent clicked!");
  });
</script>
