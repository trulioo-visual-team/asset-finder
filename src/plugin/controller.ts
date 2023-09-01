figma.showUI(__html__, { width: 360, height: 580 });

figma.skipInvisibleInstanceChildren = true;

// insert instance
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
  if (msg.type === "dropdrop") {
    // if (figma.currentPage.selection.length) {
    //   switch(msg.format) {
    //     case "Illustration":
    //     case "Icon": {
    //       figma.currentPage.selection.forEach(el => {
    //         if(el .type == "INSTANCE") {

    //         }
    //       })
    //     }
    //   }
    // } else {
    //   switch(msg.format) {
    //     case "Illustration":
    //     case "Icon": {
    //       insertInstance(msg.content)
    //     }
    //     case "Text": {
    //       insertContent(msg.content)
    //     }
    //   }

    // }

    // switch(msg.format) {
    //   case "Illustration":
    //   case "Icon": {

    //   }

    // }
    if (msg.format === "Illustration" || msg.format === "Icon") {
      if (
        figma.currentPage.selection.length &&
        figma.currentPage.selection[0].type == "INSTANCE"
      ) {
        swapInstance(msg.content);
      } else {
        insertInstance(msg.content);
      }
    } else {
      if (figma.currentPage.selection[0].type == "TEXT") {
        swapText(msg.content);
      }
    }
  }
  if (msg.type === "close") {
    figma.closePlugin();
  }
};
