```mermaid

sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Visit /spa

    browser->>server: GET /spa
    server-->>browser: HTML document

    browser->>server: GET main.css
    server-->>browser: CSS file

    browser->>server: GET spa.js
    server-->>browser: JavaScript file

    browser->>browser: Execute JavaScript

    browser->>server: GET /data.json
    server-->>browser: JSON notes data

    note right of browser: JavaScript renders notes into the page
```
