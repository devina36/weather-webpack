class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#search-input').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
              <style>
                * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              :host {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              #search-container {
                width: 40%;
                position: relative;
              }
              
              input {
                width: 100%;
                background: linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) -41.94%, rgba(255, 255, 255, 0.12) 57.51%);
                backdrop-filter: blur(50px);
                border-radius: 14px;
                padding: 15px 45px 15px 15px;
                margin: 0;
                border: none;
                font-family: 'Inter', sans-serif;
              }
              
              input::placeholder {
                color: #fff;
              }
              
              #search-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 20px;
                z-index: 5;
                background-color: transparent;
                border: none;
                margin: 0;
                color: #fff;
                cursor: pointer;
                padding: 5px;
                border-radius: 8px;
                background-color: rgba(255,255,255, 0.2);

              }

              @media screen and (max-width: 600px) {
                #search-container {
                  width: 70%;
                }
              }
            </style>
            <div id="search-container">
                <input id="search-input" type="search" placeholder="Search your Location" />
                <button id="search-button" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                    />
                  </svg>
                </button>
            </div>
        `;

    this.shadowDOM.querySelector('#search-button').addEventListener('click', this._clickEvent);
  }
}

customElements.define('search-bar', SearchBar);
