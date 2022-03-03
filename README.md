# WeDrive

@leandrofturi

---
## Executando

Inicialmente você irá precisar criar um Personal Access Token no Github para a console do Amplify e usar a URL do repositório GitHub durante a instalação.

## Gerando seu token de acesso ao GitHub

Para utilizar a console do Amplify, é necessário gerar o token de acesso pessoal.
Uma vez criado, o token de acesso deve ser guardado de maneira segura, caso seja perdido um novo token precisa ser gerado.
Para configurar o seu token de acesso, use [New personal access page](https://github.com/settings/tokens/new) no GitHub.

Será necessário sua senha do GitHub para gerar o token de acesso.

### Construindo a aplicação - Passo a Passo

Inicialmente, você deve criar um arquivo de configuração que armazena parâmetros padrão dos comandos que serão usados. Este arquivo de configuração está no formato de arquivo [TOML](https://toml.io/en/) e o nome do arquivo padrão é `samconfig.toml`. O local padrão do arquivo é o diretório raiz do projeto, que contém o arquivo de modelo AWS SAM `template.yml`.

#### Compilando as funções do backend

O AWS SAM CLI simplifica o processo de compilação para vários ambientes de execução e copia o código fonte para a pasta de *staging* deixando as funções prontas para serem empacotadas e instaladas. O comando `sam build` compila usando qualquer dependência que a aplicação tenha e copia o código fonto para pastas abaixo de aws-sam/build para ser compactados e carregado para o serviço AWS Lambda.

```bash
export DEPLOYMENT_BUCKET=ufes-we-drive
export STACK_NAME="we-drive"
export OAUTH_TOKEN=***

$Env:DEPLOYMENT_BUCKET="ufes-we-drive"
$Env:STACK_NAME="we-drive"
$Env:OAUTH_TOKEN=***
```

```bash
sam build --use-container
```

#### Empacotando o backend

Execute `sam package` para empacotar a função Lambda e suas dependências em um zip e salvar em um *bucket* no Amazon S3. Será gerado o arquivo packaged.yml com o endereço do *bucket* e a localização do arquivo. Para empacotar a execute o comando abaixo:

```bash
sam package \
  --output-template-file packaged.yml \
  --s3-bucket $DEPLOYMENT_BUCKET

sam package --output-template-file packaged.yml --s3-bucket $Env:DEPLOYMENT_BUCKET
```

#### Instalação do backend

O comando `sam deploy` instala a aplicação no ambiente AWS. Esse comando explicitamente inclui os parâmetros:

* A AWS Region na qual será instalado o pacote da aplicação. Deve ser a mesma região onde está o *bucket* do Amazon S3 que contém o pacote.

* O parâmetro CAPABILITY_IAM, é para permitir que sejam criadas novas IAM roles para as funções Lambda.

```bash
sam deploy \
  --template-file packaged.yml \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_IAM \
  --s3-bucket $DEPLOYMENT_BUCKET \
  --parameter-overrides ParameterKey=OauthToken,ParameterValue=$OAUTH_TOKEN


sam deploy --template-file packaged.yml --stack-name $Env:STACK_NAME --capabilities CAPABILITY_IAM --s3-bucket $Env:DEPLOYMENT_BUCKET --parameter-overrides ParameterKey=OauthToken,ParameterValue=$Env:OAUTH_TOKEN
```

#### Atualizando o Frontend

Uma vez com a infraestrutura instalada usando o SAM será necessário criar o arquivo de configuração para o frontend da aplicação web. Você pode obter os valores necessários pela descrição do Stack do CloudFormation:

```bash
aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[]"

aws cloudformation describe-stacks --stack-name $Env:STACK_NAME --query "Stacks[0].Outputs[]"
```

Copie o arquivo de configuração padrão e atualize com os valores abaixo:

```bash
cp www/src/config.default.js www/src/config.js
```

```bash
cd www/src
npm install
npm start
```

#### Instalação do Frontend

Instale seu aplicativo verificando sua atualização no arquivo `config.js` e enviando esse commit para seu repositótio. O Amplify Console implantará automaticamente a atualização a partir daí.

```bash 
git add .
git commit -m 'Update frontend config'
git push
```

Você pode visualizar o processo de instalação pelo Amplify Console.

## Limpeza dos Recusos

### Apagar a Stack do CloudFormation

```bash
aws cloudformation delete-stack \
  --stack-name $STACK_NAME
```

### Apagar o CloudWatch Log Groups

```bash
for log_group in $(aws logs describe-log-groups --log-group-name-prefix '/aws/lambda/'$STACK_NAME --query "logGroups[*].logGroupName" --output text); do
  echo "Removing log group ${log_group}..."
  aws logs delete-log-group --log-group-name ${log_group}
  echo
done
```
---

## Configurações adicionais

Em Amplify > Rewrites and redirects, adicione a seguinte regra:

- Source address: `</^[^.]+$|.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/></^((?!.(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$).)*$/>`
- Target address: `/index.html`
- Type: `200 (Rewrite)`


## Licenciamento

Essa arquitetura de referência está licenciada sob os termos [Apache 2.0](LICENSE).