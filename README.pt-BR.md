# Web Menu

Uma aplicação full-stack de cardápio digital e gerenciamento de pedidos para restaurantes.

O Web Menu oferece aos restaurantes um cardápio público onde clientes podem visualizar os produtos, fazer pedidos para entrega sem precisar criar uma conta e acompanhar seus pedidos, além de uma área de gerenciamento privada para administrar o cardápio e os pedidos recebidos.

[English](./README.md) | **Português Brasileiro**

🔗 [Web Menu](https://webmenu.guiafsantos.dev/) · [Restaurante de exemplo](https://webmenu.guiafsantos.dev/r/example-restaurant)

> O restaurante de exemplo pode ser usado para explorar a experiência do cliente. Para testar os recursos de gerenciamento, crie seu próprio restaurante através da aplicação principal.

## Funcionalidades

### Cliente

- Visualização dos itens do cardápio por categoria
- Visualização de detalhes e disponibilidade dos produtos
- Carrinho persistente com controle de quantidades
- Pedidos para entrega sem necessidade de criar uma conta
- Escolha da forma de pagamento, incluindo solicitação de troco para pagamentos em dinheiro
- Acompanhamento de pedidos através de um código único
- Atualização do status conforme o pedido é processado pelo restaurante
- Interface responsiva com navegação dedicada para dispositivos móveis
- Controle da disponibilidade do restaurante, impedindo novos pedidos enquanto estiver fechado

### Gerenciamento do restaurante

- Criação, edição, exclusão e categorização de itens do cardápio
- Controle individual da disponibilidade dos produtos
- Visualização de pedidos ativos e finalizados
- Acesso às informações do cliente, entrega, pagamento e pedido
- Avanço dos pedidos pelas etapas de processamento
- Cancelamento de pedidos ativos
- Abertura ou fechamento do restaurante para novos pedidos
- Configuração das informações do restaurante, taxa de entrega, horário de funcionamento e contato
- Personalização da URL pública do restaurante
- Configuração de idioma e moeda
- Acesso e cópia do endereço do cardápio público diretamente pela área de gerenciamento

## Capturas de tela

### Cardápio do cliente

<p align="center">
  <img src="./public/docs/customer-menu.png" alt="Cardápio do cliente" width="1000" />
</p>

### Dispositivos móveis

<p align="center">
  <img src="./public/docs/mobile-menu.jpg" alt="Cardápio do cliente em dispositivo móvel" width="280" />
  <img src="./public/docs/mobile-cart.jpg" alt="Carrinho em dispositivo móvel" width="280" />
</p>

### Gerenciamento do restaurante

<table>
  <tr>
    <td width="50%" align="center">
      <img src="./public/docs/admin-menu.png" alt="Gerenciamento do cardápio" />
      <br />
      <sub>Gerencie os itens do cardápio, suas categorias e disponibilidade.</sub>
    </td>
    <td width="50%" align="center">
      <img src="./public/docs/settings.png" alt="Configurações do restaurante" />
      <br />
      <sub>Configure as informações do restaurante, idioma, moeda e outras opções.</sub>
    </td>
  </tr>
</table>

## Gerenciamento de pedidos

Os pedidos seguem um fluxo definido desde o recebimento até a entrega:

`Pendente → Aceito → Em preparo → Pronto → Entregue`

Pedidos ativos são mantidos separados dos pedidos entregues e cancelados, mantendo a página focada no que precisa de atenção no momento. As mudanças de status são feitas através de uma interação de pressionar e segurar, ajudando a evitar atualizações acidentais.

<p align="center">
  <img src="./public/docs/order-management.gif" alt="Avanço de um pedido pelo fluxo de processamento" width="1000" />
</p>

## Localização

O Web Menu está disponível em **inglês** e **português brasileiro**, com o idioma configurado individualmente para cada restaurante.

Conteúdos inseridos pelo próprio restaurante, como nomes e descrições dos produtos, horário de funcionamento e informações de contato, são mantidos exatamente como foram cadastrados, sem tradução automática.

A moeda também é configurada por restaurante, com os preços formatados de acordo com a moeda selecionada e o idioma atual.

## Tecnologias

- Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Headless UI

## Executando localmente

### Pré-requisitos

- Node.js
- pnpm
- PostgreSQL

### Clone o repositório

```bash
git clone git@github.com:oguiaugusto/web-menu.git
cd web-menu
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="sua-string-de-conexao-postgresql"
JWT_SECRET="seu-segredo-jwt"
CRON_SECRET="seu-segredo-cron"
```

### Configuração

Instale as dependências:

```bash
pnpm install
```

Execute as migrações do banco de dados:

```bash
pnpm prisma migrate deploy
```

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Sobre

O Web Menu foi inspirado pela experiência de pedidos em pequenos restaurantes e comércios locais, que muitas vezes dependem de aplicativos de mensagens e outras formas informais para compartilhar seus cardápios e receber pedidos.

O projeto explora uma versão mais estruturada desse fluxo, mantendo a experiência do cliente simples: abrir o cardápio de um restaurante, escolher o que deseja, fazer um pedido e acompanhar seu progresso. Do outro lado, o restaurante tem uma interface focada na manutenção do cardápio e no gerenciamento desses pedidos, desde o recebimento até a entrega.

O projeto também foi desenvolvido como uma oportunidade de trabalhar com o Next.js como framework full-stack, especialmente com App Router, Server Components, Server Actions e a separação entre os fluxos públicos dos clientes e os recursos autenticados de gerenciamento.

## Licença

Este projeto está licenciado sob a [Licença MIT](./LICENSE).
