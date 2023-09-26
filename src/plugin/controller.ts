figma.showUI(__html__, { width: 360, height: 580 });

figma.skipInvisibleInstanceChildren = true;

// test array
const testArray = [
  "Australia",
  "Brazil",
  "Canada",
  "China",
  "France",
  "Germany",
  "United States"
];

// insert instance into current selection or onto the page
async function insertInstance(key) {
  let importComponent = await figma.importComponentByKeyAsync(key);
  const instance = importComponent.createInstance();
  instance.x = figma.viewport.center.x;
  instance.y = figma.viewport.center.y;
  const nodes: SceneNode[] = [];
  nodes.push(instance);
  figma.currentPage.selection = nodes;
  // figma.viewport.scrollAndZoomIntoView(nodes)
}

// swap instance
async function swapInstance(key) {
  if (figma.currentPage.selection[0].type == "INSTANCE") {
    let importComponent = await figma.importComponentByKeyAsync(key);
    figma.currentPage.selection[0].swapComponent(importComponent);
  } else {
    figma.notify("Swapping components can only be done with an instance");
  }
}

// swap all test
async function swapAll() {
  for (
    let i = 0;
    i < testArray.length && i < figma.currentPage.selection.length;
    i++
  ) {
    if (figma.currentPage.selection[i].type == "TEXT") {
      await Promise.all(
        figma.currentPage.selection[i]
          .getRangeAllFontNames(
            0,
            figma.currentPage.selection[i].characters.length
          )
          .map(figma.loadFontAsync)
      );
      figma.currentPage.selection[i].deleteCharacters(
        0,
        figma.currentPage.selection[i].characters.length
      );
      figma.currentPage.selection[i].insertCharacters(0, testArray[i]);
    }
  }
}

// swap text
async function swapText(text) {
  if (figma.currentPage.selection[0].type == "TEXT") {
    await Promise.all(
      figma.currentPage.selection[0]
        .getRangeAllFontNames(
          0,
          figma.currentPage.selection[0].characters.length
        )
        .map(figma.loadFontAsync)
    );
    figma.currentPage.selection[0].deleteCharacters(
      0,
      figma.currentPage.selection[0].characters.length
    );
    figma.currentPage.selection[0].insertCharacters(0, text);
  } else {
    figma.notify("Swapping text can only be done with text");
  }
}

// swap text
async function insertText(text) {
  let textComponent = await figma.createText();
  await figma.loadFontAsync({ family: "Libre Franklin", style: "Regular" });
  textComponent.textStyleId =
    "S:9eabd280231a4fe176fae2ab59cb9ed630f9b11e,1067:39";
  textComponent.insertCharacters(0, text);

  const variable = figma.variables.getVariableById(
    "VariableID:0d7616366ac67b10f4d4b38cf08922f4294f4bed/10874:193"
  );
  const fillsCopy = clone(textComponent.fills);
  fillsCopy[0] = figma.variables.setBoundVariableForPaint(
    fillsCopy[0],
    "color",
    variable
  );
  textComponent.fills = fillsCopy;
  textComponent.x = figma.viewport.center.x;
  textComponent.y = figma.viewport.center.y;
  const nodes: SceneNode[] = [];
  nodes.push(textComponent);
  figma.currentPage.selection = nodes;

  // ****** adding to a specific layer
  // if (figma.currentPage.selection.length > 0) {

  //     if (figma.currentPage.selection[0].type == 'FRAME' || figma.currentPage.selection[0].type == 'GROUP') {
  //       figma.currentPage.selection[0].appendChild(textComponent)
  //       return
  //     } else {
  //       figma.currentPage.selection[0].parent.appendChild(textComponent)
  //       return
  //     }
  // } else {
  //   textComponent.x = figma.viewport.center.x;
  //   textComponent.y = figma.viewport.center.y;
  //   const nodes: SceneNode[] = [];
  //   nodes.push(textComponent);
  //   figma.currentPage.selection = nodes;
  // }
}

// clone helper
function clone(val) {
  const type = typeof val;
  if (val === null) {
    return null;
  } else if (
    type === "undefined" ||
    type === "number" ||
    type === "string" ||
    type === "boolean"
  ) {
    return val;
  } else if (type === "object") {
    if (val instanceof Array) {
      return val.map(x => clone(x));
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val);
    } else {
      let o = {};
      for (const key in val) {
        o[key] = clone(val[key]);
      }
      return o;
    }
  }
  throw "unknown";
}

// Swap for text and components
async function swapAllTextAndComponent(text, component) {
  let count = 0;
  for (
    let i = 0;
    i < text.length && i < figma.currentPage.selection.length;
    i++
  ) {
    if (figma.currentPage.selection[i].type == "TEXT") {
      await Promise.all(
        figma.currentPage.selection[i]
          .getRangeAllFontNames(
            0,
            figma.currentPage.selection[i].characters.length
          )
          .map(figma.loadFontAsync)
      );
      figma.currentPage.selection[i].deleteCharacters(
        0,
        figma.currentPage.selection[i].characters.length
      );
      figma.currentPage.selection[i].insertCharacters(0, text[count]);
      count++;
    }
  }
  count = 0;
  for (
    let i = 0;
    i < component.length && i < figma.currentPage.selection.length;
    i++
  ) {
    if (figma.currentPage.selection[i].type == "INSTANCE") {
      let importComponent = await figma.importComponentByKeyAsync(
        component[count]
      );
      figma.currentPage.selection[i].swapComponent(importComponent);
      count++;
    }
  }
}
// swap for 1 level of content
async function swapAllText(content) {
  for (
    let i = 0;
    i < content.length && i < figma.currentPage.selection.length;
    i++
  ) {
    if (figma.currentPage.selection[i].type == "TEXT") {
      await Promise.all(
        figma.currentPage.selection[i]
          .getRangeAllFontNames(
            0,
            figma.currentPage.selection[i].characters.length
          )
          .map(figma.loadFontAsync)
      );
      figma.currentPage.selection[i].deleteCharacters(
        0,
        figma.currentPage.selection[i].characters.length
      );
      figma.currentPage.selection[i].insertCharacters(0, content[i]);
    }
  }
}

// insert text onto the page
async function insertContent(content) {
  let importComponent = await figma.importComponentByKeyAsync(content);
  const instance = importComponent.createInstance();
  instance.x = figma.viewport.center.x;
  instance.y = figma.viewport.center.y;
  const nodes: SceneNode[] = [];
  nodes.push(instance);
  figma.currentPage.selection = nodes;

  // figma.viewport.scrollAndZoomIntoView(nodes)
}

// start
figma.ui.onmessage = msg => {
  if (msg.type === "swapItem") {
    // check the type
    if (msg.format === "component") {
      if (
        figma.currentPage.selection.length &&
        figma.currentPage.selection[0].type == "INSTANCE"
      ) {
        swapInstance(msg.content);
      } else {
        figma.notify("Swapping components can only be done with an instance", {
          timeout: 1000
        });
      }
    } else {
      if (figma.currentPage.selection[0].type == "TEXT") {
        swapText(msg.content);
      } else {
        figma.notify("Swapping text can only be done with text", {
          timeout: 1000
        });
      }
    }
  }

  // swap item
  if (msg.type === "addItem") {
    // check the type
    if (msg.format === "component") {
      insertInstance(msg.content);
    } else {
      insertText(msg.content);
    }
  }

  if (msg.type === "swapAllTextAndComponent") {
    swapAllTextAndComponent(msg.contentText, msg.contentComponent);
  }

  if (msg.type === "swapAllText") {
    swapAllText(msg.content);
  }

  if (msg.type === "close") {
    figma.closePlugin();
  }

  if (msg.type === "testSwapAll") {
    swapAll();
  }
  if (msg.type === "swapText") {
    swapText(msg.content);
  }
};
