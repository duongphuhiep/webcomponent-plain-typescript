const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = /*html*/`
  <style>
    * {
      font-size: 200%;
    }

    span {
      width: 4rem;
      display: inline-block;
      text-align: center;
    }

    button {
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 10px;
      background-color: seagreen;
      color: white;
    }
  </style>
  <button id="dec">-</button>
  <span id="count"></span>
  <button id="inc">+</button>`;

class MyCounter extends HTMLElement {
    count = 0;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot?.appendChild(template.content.cloneNode(true));

        let incElement = this.shadowRoot?.getElementById("inc");
        if (incElement) incElement.onclick = () => this.inc();

        let decElement = this.shadowRoot?.getElementById("dec");
        if (decElement) decElement.onclick = () => this.dec();

        this.update(this.count);
    }

    inc() {
        this.update(++this.count);
    }

    dec() {
        this.update(--this.count);
    }

    update(count: number) {
        let htmlElement = this.shadowRoot?.getElementById("count");
        if (htmlElement)
            htmlElement.innerHTML = count.toString();
    }
}

customElements.define("my-counter", MyCounter);
