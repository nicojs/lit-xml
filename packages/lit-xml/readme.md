# Lit XML 🔥

<p align="center">
  <img width="200" height="200" src="https://raw.githubusercontent.com/nicojs/lit-xml/master/packages/vscode-lit-xml/images/icon.png">
</p>

> Burning your XML documents to the ground? Yes please. In the mean time, let's use lit-xml.

A small utility to help construction of XML documents using a simple [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). Because you sometimes have to use XML 🤷‍♀️.

## 🗺️ Installation

Install `lit-xml` locally within your project folder, like so:

```shell
npm i lit-xml
```

Or with yarn:

```shell
yarn add lit-xml
```

## 🎁 Usage

A simple example:

```ts
import { xml } from 'lit-xml';

const xmlFragment = xml`<foo bar="${41 + 1}">Some ${'<content>'}</foo>`.toString();
// => '<foo bar="42">Some &lt;content&gt;</foo>'
```

Importing `xml` will give you the _default xml template literal_. It will sanitize values, but not validate on well formed xml for performance reasons. 

A more advanced scenario:

```ts
import { createLitXml } from 'lit-xml';
const xml = createLitXml({
  format: true,
  validators: [validators.isWellFormed],
  indent: 2
});


xml`<foo bar="${41 + 1}"><baz></baz></foo>`.toString();
// => `<foo bar="42">
//       <baz/> 
//     </foo>`

xml`<foo><foo>`.toString();
// InvalidXmlError! Error on line 1: Closing tag 'foo' is expected inplace of 'bar'. 

const people = [{ name: 'foo' }, { name: 'bar' }];
xml`<people>${people.map((p) => xml`<person>${p.name}</person>`)}</people>`.toString();
// => `<people>
//      <person>foo</person>
//      <person>bar</person>
//    </people>`
```

In this example, the `createLitXml` factory method is used to create a _custom xml template literal_. 
In this case it will validate that the XML document is well-formed and it will be formatted (with an indent of 2 spaces).

## 🚀 Features

🧩 Construct xml documents using plain JS like [conditional operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) and [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)  
💄 [vscode plugin](https://github.com/nicojs/lit-xml/tree/master/packages/vscode-lit-xml#lit-xml-vs-code-extension-) for syntax highlighting  
🚿 Interpolated values are sanitized  
📐 Configurable [well formed](https://www.w3resource.com/xml/well-formed.php) validation using [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser)    
👓 Configurable formatting output using [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser)  

## 💭 Motivation

JavaScript is not-XML friendly. We're missing good libraries to construct larger XML documents without relying on template libraries like [ejs](https://www.npmjs.com/package/ejs) or [handlebars](https://www.npmjs.com/package/handlebars). 

This library is an attempt to solve this problem using the simple feature of [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). It is inspired by the awesome [lit-html](https://www.npmjs.com/package/lit-html).
