// author： kirahan
// upgrade date:2020.2.28

// data structure of Script Filter module
// detail documents:
// https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
// pannel appearance
// -----------  title   ---------------------------shortcut key---
// ---icon----  title   ---------------------------shortcut key---
// ---icon----  title   ---------------------------shortcut key---
// -----------subtitle  ---------------------------shortcut key---
//A standard format:
// {"items": [
//     {
//         "uid": "desktop",
//         "type": "file",
//         "title": "Desktop",
//         "subtitle": "~/Desktop",
//         "arg": "~/Desktop",
//         "autocomplete": "Desktop",
//         "icon": {
//             "type": "fileicon",
//             "path": "~/Desktop"
//         }
//     }
// ]}

// most simple format
// {
//     "title": "your title",
//     "arg": `output params`,
// }

// complete format
// {
//     "rerun" : 1,
//     "variables": {
//         "fruit": "banana",
//         "vegetable": "carrot"
//     },
//     "items" : [
//         {
//             "uid" : 'uuid',
//             "title": "设置风扇转速",
//             "subtitle": "输入数值即可修改，推荐在2000-3500之间",
//             "arg": 0,
//             "icon": {
//               type: 'filetype',
//               path: 'fan_red.jpg',
//             },
//             "valid": true,
//             "match": 'hello',
//             "autocomplete": 'sfan',
//             "type" : 'default',
//             "mods": {
//                 "alt": {
//                     "valid": true,
//                     "arg": "alfredapp.com/powerpack",
//                     "subtitle": "https://www.alfredapp.com/powerpack/"
//                 },
//                 "cmd": {
//                     "valid": true,
//                     "arg": "alfredapp.com/shop/",
//                     "subtitle": "https://www.alfredapp.com/shop/"
//                 },
//             },
//             "text": {
//                 "copy": `当前风扇转速为-${speed}rpm`,
//                 "largetype": `当前风扇转速为-${speed}rpm`
//             },
//             "quicklookurl": 'www.baidu.com'
//         }
//     ]
// }

// pannel display 1
// -----------  title   ---------------------------shortcut key---
// ---icon----  title   ---------------------------shortcut key---
// ---icon----  title   ---------------------------shortcut key---
// -----------subtitle  ---------------------------shortcut key---

class displayList {
  constructor() {
    this._structure = {};
    this._variables = {};
    this._rerun = undefined;

    this._uid = undefined;
    this._title = "";
    this._subtitle = "";
    this._arg = "";
    this._items = [
      {
        title: this._title,
        subtitle: this._subtitle,
        arg: this._arg
      }
    ];
    this._icon = {
      type: undefined,
      path: undefined
    };
    this._valid = true;
    this._match = undefined;
    this._autocomplete = undefined;
    this._type = "default";
    this._mods = {
      alt: {
        valid: true,
        arg: "",
        subtitle: ""
      },
      cmd: {
        valid: true,
        arg: "",
        subtitle: ""
      }
    };
    this._text = {
      copy: undefined,
      largetype: undefined
    };
    this._quicklookurl = undefined;

    this._data = {
      items: this._items
    };
  }
  Data(command) {
    if (command == "rerun") {
      let old = this._data;
      old.rerun = this._rerun;
      return this;
    } else if (command == "variables") {
      let old = this._data;
      old.variables = this._variables;
      return this;
    } else {
      return this._data;
    }
  }
  items(data) {
    if (data) {
      this._items = data;
      return this;
    } else {
      return this._items;
    }
  }

  additems() {
    this._items.push({
      title: "",
      subtitle: "",
      arg: ""
    });
    return this;
  }
  // read and set uid
  // uid : STRING (optional)
  // This is a unique identifier for the item which allows help Alfred to
  // learn about this item for subsequent sorting and ordering of the user's actioned results.
  uid(string) {
    if (string) {
      this._uid = string;
      let old = this.items();
      old[old.length - 1].uid = this._uid;
      return this;
    } else {
      return this._uid;
    }
  }

  // read and set title
  // title
  // The title displayed in the result row. There are no options for this element and it is essential that this element is populated.
  title(string) {
    if (string) {
      this._title = string;
      let old = this.items();
      old[old.length - 1].title = this._title;
      return this;
    } else {
      return this._title;
    }
  }

  // read and set subtitle
  // subtitle
  // The subtitle displayed in the result row. This element is optional.
  subtitle(string) {
    if (string) {
      this._subtitle = string;
      let old = this.items();
      old[old.length - 1].subtitle = this._subtitle;
      return this;
    } else {
      return this._subtitle;
    }
  }

  // read and set arg
  // arg : STRING (recommended)
  // The argument which is passed through the workflow to the connected output action.
  arg(string) {
    if (string) {
      this._arg = string;
      let old = this.items();
      old[old.length - 1].arg = this._arg;
      return this;
    } else {
      return this._arg;
    }
  }

  // read and set icon
  // icon : Object (optional)
  // By omitting the "type", Alfred will load the file path itself, for example a png.
  // By using "type": "fileicon", Alfred will get the icon for the specified path.
  // Finally, by using "type": "filetype",such as jpg,png, you can get the icon of a specific file,
  // for example "path": "public.png"
  icon(type, path) {
    if (type && path) {
      this._icon.type = type;
      this._icon.path = path;

      let old = this.items();

      // 因为this._icon 是对象，对象是浅拷贝，所以用json倒一回
      old[old.length - 1].icon = JSON.parse(JSON.stringify(this._icon));
      return this;
    } else {
      return this._icon;
    }
  }

  // read and set valid
  // valid : true | false (optional, default = true)
  // If this item is valid or not. If an item is valid then Alfred will action this item
  // when the user presses return. If the item is not valid, Alfred will do nothing.
  valid([command, bool]) {
    if (command == "set") {
      this._valid = bool;
      let old = this.items();
      old[old.length - 1].valid = this._valid;
      return this;
    } else {
      return this._valid;
    }
  }

  // read and set match
  // match : STRING (optional)
  // If match is present, it fully replaces matching on the title property.
  match(string) {
    if (string) {
      this._match = string;
      let old = this.items();
      old[old.length - 1].match = this._match;
      return this;
    } else {
      return this._match;
    }
  }

  // read and set autocomplete
  // autocomplete : STRING (recommended)
  // An optional but recommended string you can provide which is populated into Alfred's
  // search field if the user auto-complete's the selected result (⇥ by default).
  autocomplete(string) {
    if (string == "default") {
      this._autocomplete = "";
      let old = this.items();
      old[old.length - 1].autocomplete = this._autocomplete;
      return this;
    } else if (string) {
      this._autocomplete = string;
      let old = this.items();
      old[old.length - 1].autocomplete = this._autocomplete;
      return this;
    } else {
      return this._autocomplete;
    }
  }

  // read and set type
  // type : "default" | "file" | "file:skipcheck" (optional, default = "default")
  // By specifying "type": "file", this makes Alfred treat your result as a file on your system.
  // If you would like Alfred to skip this check as you are certain that the files you are returning exist, you can use "type": "file:skipcheck".
  type(string) {
    if (string) {
      this._type = string;
      let old = this.items();
      old[old.length - 1].type = this._type;
      return this;
    } else {
      return this._type;
    }
  }

  // read and set mods
  // mods : OBJECT (optional)
  // The mod element gives you control over how the modifier keys react.
  // You can now define the params below for each object in the mods object.
  //  [valid, arg, icon, variables]
  mods(key, config) {
    if (key && config) {
      if (key == "alt") {
        this._mods.alt = config;
        let old = this.items();
        old[old.length - 1].mods = JSON.parse(JSON.stringify(this._mods));
        return this;
      } else if (key == "cmd") {
        this._mods.cmd = config;
        let old = this.items();
        old[old.length - 1].mods = JSON.parse(JSON.stringify(this._mods));
        return this;
      }
    } else {
      return this._mods;
    }
  }

  // read and set text
  // text : OBJECT (optional)
  // The text element defines the text the user will get when copying the
  // selected result row with ⌘C or displaying large type with ⌘L.
  text(copy, largetype) {
    if (copy && largetype) {
      this._text.copy = copy;
      this._text.largetype = largetype;
      let old = this.items();
      old[old.length - 1].text = JSON.parse(JSON.stringify(this._text));
      return this;
    } else {
      return this._text;
    }
  }

  // read and set quicklookurl
  // quicklookurl :  STRING (optional)
  // A Quick Look URL which will be visible if the user uses the Quick Look feature within Alfred (tapping shift, or cmd+y).
  quicklookurl(string) {
    if (string) {
      this._quicklookurl = string;
      let old = this.items();
      old[old.length - 1].quicklookurl = this._quicklookurl;
      return this;
    } else {
      return this._quicklookurl;
    }
  }

  // read and set rerun
  // rerun : Number (optional) 0.1 to 5.0
  // Scripts can be set to re-run automatically after an interval using the 'rerun' key
  // with a value of 0.1 to 5.0 seconds. The script will only be re-run if the
  // script filter is still active and the user hasn't changed the state of the filter
  // by typing and triggering a re-run.
  rerun(period) {
    if (period) {
      this._rerun = period;
      this.Data("rerun");
      return this;
    } else {
      return this._rerun;
    }
  }

  // read and set variables
  // variables : Number (optional) 0.1 to 5.0
  // This is useful for two things.
  // Firstly, these variables will be passed out of the script filter's outputs when actioning a result.
  // Secondly, any variables passed out of a script will be passed back in as
  // environment variables when the script is run within the same session.

  // This can be used for very simply managing state between runs as the
  // user types input or when the script is set to re-run after an interval.
  variables(varobject) {
    if (varobject && varobject.key) {
      this._variables[varobject.key] = varobject.value;
      this.Data("variables");
      return this;
    } else {
      return this._variables;
    }
  }
}
module.exports = { displayList };
