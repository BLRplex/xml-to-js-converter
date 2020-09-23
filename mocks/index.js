export const expectXMLContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<FileDump><Message>
  <From>Joe.doe@gmail.com</From>
  <Message>Hi Jane</Message>
</Message>
<Message>
  <From>JANE.DOE@gmail.com</From>
  <Message>Hi Jane. How was yur day today. e are not trading </Message>
</Message>
<Message>
  <From>Joe.doe@gmail.com</From>
  <Message>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  </Message>
</Message>
<Message>
  <From>JANE.DOE@gmail.com</From>
  <Message>Great to hear. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, <script>console.error(String.fromCharCode(72, 65, 67, 75, 69, 68))</script>consectetur, adipisci velit... </Message>
</Message></FileDump>`

export const expectJSONContent = '[{"From":"Joe.doe@gmail.com","Message":"Hi Jane"},{"From":"JANE.DOE@gmail.com","Message":"Hi Jane. How was yur day today. e are not trading"},{"From":"Joe.doe@gmail.com","Message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"},{"From":"JANE.DOE@gmail.com","Message":{"script":"console.error(String.fromCharCode(72, 65, 67, 75, 69, 68))","$text":"Great to hear. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."}}]'
