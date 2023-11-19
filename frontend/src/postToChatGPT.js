export const postToChatGPT = props => {
   return  fetch('https://catfact.ninja/fact')
        .then(resp =>resp.json())
}
