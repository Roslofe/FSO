```mermaid
	sequenceDiagram
		participant browser
		participant server

		browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
		Note right of browser: The browser sends the new note to the server
		activate server
		server-->>browser: { "message":"note created" }
```