## Sistema de integração com I.A
Sistema de integração para trabalho envolvendo imagens como input e retorna um output de imagens modificadas por I.A sem a necessidade do usuário colocar um prompt.

## Como rodar esse projeto?
Primeiro passo configure o ambiente e instale a seguinte dependencia:
```bash 
$npm install @google/generative-ai
```
Depois faça um git clone desse repositório no seu terminal
```bash
$git clone danieldeazevedo/IaSystemIntegrationImage
```
## Como usar?
Quando copiar ou clonar esse repo certifique-se de importar as funções generateImage e generateHashtags dessa forma:
```js
import {generateImage, generateHashtags} from 'path/.../index.js'
```
Coloque o caminho de forma certa para conseguir exportar as funções e verifique se o arquvio existe e que as pastas 
``image/get`` e ``image/imagetest``
Obvio que nomes podem ser mudados mas verifique se os caminhos estão certos e que há uma pasta para armazenar os resultados das funções para minimizar problemas.
## generateImage e generateHashtags 
Para funcionar nas funções ``generateImage `` e ``generateHashtags ``
passe os seguintes valores:
```js

//se quiser gerar mais de uma imagem coloque o parametro a em um loop

/*
for (let a == 0, a < 4, a++){

//passe o parametro "a" aqui

}
*/
generateImage(a,"image/get/[PATH_NAME_AQUI]", "image/imagetest/", "[NOME_DA_PATH_ESCOLHIDA]", "MIME_TYPE");
 
// fazer gerar hashtags 
generateHashtags("image/get/[PATH_NAME_AQUI]", "MIME_TYPE");
```
Certifique se o seu projeto tem uma forma de indentificar o MIME

## Erros na geração de imagem
Os erros mais frequentes na geração de imagem é o IMAGE_SAFETY que retorna algo similar a imagem abaixo:

<img src="/erro.jpg" alt="Imagem não carregada">
Esse é retornado por 2 principais motivos:
1.Imagem de pessoas que sejam menor de 18 ou que tenham características similares a pessoas menor de 18 anos
2.Imagem de famosos
Esses "erros" são retornados para a prevenção de abusos então até o momento nao é possivel gerar esses tipos de imagem.
