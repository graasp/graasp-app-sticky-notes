# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.7.0](https://github.com/graasp/graasp-app-sticky-notes/compare/v0.6.0...v0.7.0) (2023-02-17)


### Features

* **actions:** add data of new note when adding it ([6a3dc1a](https://github.com/graasp/graasp-app-sticky-notes/commit/6a3dc1a1da790a7bad5276263b25e202af46e6f7))
* **i18n:** add french translations ([efd089c](https://github.com/graasp/graasp-app-sticky-notes/commit/efd089c8bce239f05099157bf5060eec6959027b))
* **UI:** add avatars (letters only) to show note creators ([30ccacf](https://github.com/graasp/graasp-app-sticky-notes/commit/30ccacfe41639261f14546009b87a3a1c2cf8b19))


### Bug Fixes

* **actions:** add AppActions context to the app ([2427363](https://github.com/graasp/graasp-app-sticky-notes/commit/2427363f1f22dc0e873d06c69f25d190146e6e0a))
* **UI:** remove comma between letters ([c3ecb1d](https://github.com/graasp/graasp-app-sticky-notes/commit/c3ecb1d62583ee5d96263db25c94b0657134d700))


### Documentation

* add infos for contributors ([3ca593d](https://github.com/graasp/graasp-app-sticky-notes/commit/3ca593d67d9dd05e4af5dfc1d73670c70d0702b2))
* update screenshots ([9387685](https://github.com/graasp/graasp-app-sticky-notes/commit/9387685773cb3199b784fddeaddc5db464f7a9c6))

## [0.6.0](https://github.com/graasp/graasp-app-sticky-notes/compare/v0.5.0...v0.6.0) (2023-01-18)


### Features

* asks for confirmation before deleting note ([fbf06f7](https://github.com/graasp/graasp-app-sticky-notes/commit/fbf06f7e27ff85d8b2631a304b5b366ccd8fc455))


### Bug Fixes

* **api:** update call to action hook ([8362b9d](https://github.com/graasp/graasp-app-sticky-notes/commit/8362b9d7cfd006d2ee5a4fe7812261f627317846))
* remove buggy and useless type declarations ([6e8b8f3](https://github.com/graasp/graasp-app-sticky-notes/commit/6e8b8f3dd477795a3eac292ed2771264a8952795))


### Documentation

* **README:** Add badges to README ([bd3a5dc](https://github.com/graasp/graasp-app-sticky-notes/commit/bd3a5dc4c958702845972ecb31bb4d4267a735a9))


### Tests

* add configure code coverage\ntest: add cypress workflow ([131c45d](https://github.com/graasp/graasp-app-sticky-notes/commit/131c45d2c10ee4096b673ed7c0efb4838c665471))
* add new tests for builder and admin ([5201297](https://github.com/graasp/graasp-app-sticky-notes/commit/520129754ab786dc4a1fec67746b286507bb0573))
* add tests for notes interactions ([ba76eef](https://github.com/graasp/graasp-app-sticky-notes/commit/ba76eef05051203748e4843d01bd211fe28469f8))
* reconfigure cypress ([5201297](https://github.com/graasp/graasp-app-sticky-notes/commit/520129754ab786dc4a1fec67746b286507bb0573))
* **refactor:** use appData from database argument ([bd75c94](https://github.com/graasp/graasp-app-sticky-notes/commit/bd75c94ebc94d42d787197cee91012cccee0c69d))
* use dataCy prop as selector with Graasp UI btn ([ce72016](https://github.com/graasp/graasp-app-sticky-notes/commit/ce720161cec9eeb35a0f7d2bf6b3ada21275f646))

## [0.5.0](https://github.com/graasp/graasp-app-sticky-notes/compare/v0.4.2...v0.5.0) (2023-01-10)


### Features

* add buttons in the notes ([5910370](https://github.com/graasp/graasp-app-sticky-notes/commit/5910370c1f58fc6288e25fe8fd12b7f80a94449a))
* add delete button in edit dialog ([c511b28](https://github.com/graasp/graasp-app-sticky-notes/commit/c511b28c058def61e2a64c6f3f719692fb319477))
* add indication for background image size ([116a79c](https://github.com/graasp/graasp-app-sticky-notes/commit/116a79c7e9eac201f21a73b32afc9ba8427cc492))
* add refresh button ([a0e4413](https://github.com/graasp/graasp-app-sticky-notes/commit/a0e44139336d8e58ab66cb59b9d990d5bd4b3fb2)), closes [#73](https://github.com/graasp/graasp-app-sticky-notes/issues/73)
* configure i18n and add translation keys for EN ([f8eea92](https://github.com/graasp/graasp-app-sticky-notes/commit/f8eea924770149b007a4454939d69d2b3771db75))
* edit dialog for notes ([ea3f2f8](https://github.com/graasp/graasp-app-sticky-notes/commit/ea3f2f80512d43e655ac78f861c77e59503b0ed8))


### Bug Fixes

* add missing translation ([362f6dd](https://github.com/graasp/graasp-app-sticky-notes/commit/362f6dd37e45d569537e736d83a7987c108407e8))
* enable bckgnd settings when bckgnd uploaded ([331ec85](https://github.com/graasp/graasp-app-sticky-notes/commit/331ec85d388367401fec4aad154b17b813b7698e))
* use graasp theme colors ([e7f224c](https://github.com/graasp/graasp-app-sticky-notes/commit/e7f224ca2061fb7d1ffff77424c8120a6cce21a7))

### 0.4.2 (2022-11-18)

### 0.4.1 (2022-11-03)

## 0.4.0 (2022-10-28)

### 0.3.1 (2022-09-21)

## [0.3.0](///compare/v0.2.0...v0.3.0) (2022-09-16)


### Features

* add animations for edition 21e0f49
* center scroll when canvas loads 44a2da5
* en/disable delete button when note selected 345704d
* enable sentry 7a80eff
* impl dnd a1511e4
* resize background image 2430117
* scrollable canvas 9b38169


### Bug Fixes

* add toolbar and delete butten 09518f7
* background image 2a18549
* background image 1c0911e
* background image test c158da0
* background settings 0561f8d
* correct data formatting c091a07
* define input props for background scale 1da14d6
* fix again background image... f45d48b
* note format and design 0f146b3
* position issue when adding note 038577f
* post background settings 7737c7c
* provide default value when getting note 467eeb8
* remove old konvas related props c6b57b9
* remove size undefined with def value 249b1c0
* remove useEffect... af46aec
* scale coordinates for note creation e420efc
* ui corrections 0577b46
* update package.json c3b27f4
* update workflow sha ref 2ea5885
* upgrade rendering to react 18 4c81d4d
* useEffect for url background 6a11cad
* useEffect in background image a48988d

## [0.2.0](https://github.com/graasp/graasp-app-sticky-notes/compare/v0.1.8...v0.2.0) (2022-07-18)


### ⚠ BREAKING CHANGES

* no views, no app
* Not compatible with old API
* breaks everything

### Features

* add action traces ([3a5fffc](https://github.com/graasp/graasp-app-sticky-notes/commit/3a5fffc4e27312daa932ab6398738eb98daea3b0))
* add caller workflow to graasp-deploy ([74aa110](https://github.com/graasp/graasp-app-sticky-notes/commit/74aa110ad619204b863599db2136dca6734ede0c))
* add cdelivery and cdeployment workflows ([b817c12](https://github.com/graasp/graasp-app-sticky-notes/commit/b817c12e17a43789c57195c72c612766f14ee35e))
* implement app actions (2) ([2e8e45c](https://github.com/graasp/graasp-app-sticky-notes/commit/2e8e45c252acd7ba3f6465e2eea5e6fc13bed931))
* implement refetchInterval ([f6e71bd](https://github.com/graasp/graasp-app-sticky-notes/commit/f6e71bddd8c3e472e51e91fa898f89deeeebb413))
* include required scripts to use standard-version ([be79d4c](https://github.com/graasp/graasp-app-sticky-notes/commit/be79d4ce21bc19e2bf4929cfd9b89e48cc8809b3))
* make app run standalone ([004253a](https://github.com/graasp/graasp-app-sticky-notes/commit/004253a0f2aa11d6b3915d7722388b5170a209d9))
* try to implement itemId in context ([cdc7455](https://github.com/graasp/graasp-app-sticky-notes/commit/cdc74550e768d25f3fd87ba7e9f294e5bed56396))
* update staging versions in graasp deploy ([39d7c05](https://github.com/graasp/graasp-app-sticky-notes/commit/39d7c05a920f40d8631d2408f00fb61d20262e18))


### Bug Fixes

* [#36](https://github.com/graasp/graasp-app-sticky-notes/issues/36) ([aac3527](https://github.com/graasp/graasp-app-sticky-notes/commit/aac3527f1b0a0a27afbecdc270b0a5dac6f54db3))
* activate toggle background ([5058273](https://github.com/graasp/graasp-app-sticky-notes/commit/5058273d8aef0bf12fc4ae83d004b8ce37968c2d))
* adapt post actions to new apps-query-client ([65e08e7](https://github.com/graasp/graasp-app-sticky-notes/commit/65e08e78365454d6ab4360f39ed2ed14d101ee5c))
* add  script ([6b63258](https://github.com/graasp/graasp-app-sticky-notes/commit/6b6325860b526549e7bd4cd832d7f24c809ef916))
* add REACT_APP prefix in env var ([2df7051](https://github.com/graasp/graasp-app-sticky-notes/commit/2df70515d3d7985fdd7baea7a59f208f7897ae82))
* added changes to fix .env issue ([48eaa8e](https://github.com/graasp/graasp-app-sticky-notes/commit/48eaa8ee76c792f868a231c3ab4f83975fbe543d))
* added changes to resolve issues ([15dd72b](https://github.com/graasp/graasp-app-sticky-notes/commit/15dd72b99efd95461de46c0028cbe77f789283af))
* added step to create .env file ([bda0e16](https://github.com/graasp/graasp-app-sticky-notes/commit/bda0e16cc8dcc4d53fbd9728a99ded7711c42e1e))
* background image and app settings ([35d82b0](https://github.com/graasp/graasp-app-sticky-notes/commit/35d82b06e7b69b36abc2ac821cbd2e39981a1235))
* change secret name ([f7c2616](https://github.com/graasp/graasp-app-sticky-notes/commit/f7c2616fcef1d4188fb82c7c1006d4ab4394e6cc))
* delete notes ([f025d14](https://github.com/graasp/graasp-app-sticky-notes/commit/f025d14c0bbc381d124f619bca7567ac76dcf517))
* display image upload ([084068e](https://github.com/graasp/graasp-app-sticky-notes/commit/084068eb9227d8d18e8012303528fa7ba2fe4bf5))
* Implement color ([c19f8d7](https://github.com/graasp/graasp-app-sticky-notes/commit/c19f8d78666e0fc87d4a9ca32229ab5a891c442b))
* make background image stretchable over canvas ([4b2ce21](https://github.com/graasp/graasp-app-sticky-notes/commit/4b2ce213dbe5da5cf288ba00c37439711868d66a))
* migrate note edit note action (UI only) ([b36054b](https://github.com/graasp/graasp-app-sticky-notes/commit/b36054bbe679683ad1ea47dc31ef7d3f5ffb4a8b))
* minor changes to trigger updates in pull request ([89b8e90](https://github.com/graasp/graasp-app-sticky-notes/commit/89b8e9080e1e391f1f24159b691a817c2b205e60))
* no more data lost when color change ([1a8138f](https://github.com/graasp/graasp-app-sticky-notes/commit/1a8138fb0af890314b5ade3c014c82c21b30d95c))
* note maximisation/minimization ([4a1cdbc](https://github.com/graasp/graasp-app-sticky-notes/commit/4a1cdbcec83fe4b5886f1be987c70dc168f939f2))
* note patching after validation ([dc1593d](https://github.com/graasp/graasp-app-sticky-notes/commit/dc1593d163706415e6a6c22d13d282a2c284101d))
* reimplement color settings ([582f1e7](https://github.com/graasp/graasp-app-sticky-notes/commit/582f1e78ad11084e9c86b31584fb99f45b818011))
* reimplement settings + fix mock context ([66d65fb](https://github.com/graasp/graasp-app-sticky-notes/commit/66d65fb97d6eaace310d531c6f79a2e712cc6238))
* reimplement toggle background image ([06ac795](https://github.com/graasp/graasp-app-sticky-notes/commit/06ac795e068c17be96a6a4da1966ba5d23190b6c))
* reimplement user name display ([425cc0f](https://github.com/graasp/graasp-app-sticky-notes/commit/425cc0fdacba923ea78f078cdd9b22ecac32a1ad))
* remove unused workflows ([dbbcda8](https://github.com/graasp/graasp-app-sticky-notes/commit/dbbcda827b8c3186a3831d5609835319804f0151))
* replace anonymous username with cst. ([fc48874](https://github.com/graasp/graasp-app-sticky-notes/commit/fc48874975e6607526b0761126ce0f3d0ecca6d2)), closes [#36](https://github.com/graasp/graasp-app-sticky-notes/issues/36)
* restore noteAction style ([ae63b91](https://github.com/graasp/graasp-app-sticky-notes/commit/ae63b911f35610ae3f61a86fbd1688f6d874dd09))
* revert to react-scripts 4.0.3 (for uppy) ([e1cf13d](https://github.com/graasp/graasp-app-sticky-notes/commit/e1cf13d4102450b30e97831db1a750d8268c42ae))
* title and description edit works ([5147293](https://github.com/graasp/graasp-app-sticky-notes/commit/51472932db2f814a4fdaa8126d6b9a9e65f3bc31))
* update required secrets ([85e95f6](https://github.com/graasp/graasp-app-sticky-notes/commit/85e95f60f6004968b253b9031da007db8fd876bc))
* update secret name ([dcacf11](https://github.com/graasp/graasp-app-sticky-notes/commit/dcacf110bc92d976b2057695a046cff953a5722d))
* update sha ref and solve minor issues ([80b6e85](https://github.com/graasp/graasp-app-sticky-notes/commit/80b6e85f0fc33fd6ded78d6aed85e0b8d44e1d20))
* update workflow sha ref ([eee953f](https://github.com/graasp/graasp-app-sticky-notes/commit/eee953ff3b09b153ca43f0b3a5f56627a7e951a7))
* upload background image mechanism ([eb96725](https://github.com/graasp/graasp-app-sticky-notes/commit/eb9672540eecb122ee3572b2c9e60b91e6c709bb))


* add context for new graasp api ([322efa1](https://github.com/graasp/graasp-app-sticky-notes/commit/322efa15244ff9c8fd6cf6affa9ab20cceede888))
* port ([4c5e4f5](https://github.com/graasp/graasp-app-sticky-notes/commit/4c5e4f5ac8cbbecc22e1de55a12058c5bfd822a3))
* port to new api ([d7d95db](https://github.com/graasp/graasp-app-sticky-notes/commit/d7d95dbdec05063034728581b4e9686737d5f629))

### [0.1.8](https://github.com/graasp/graasp-app-post-it-notes/compare/v0.1.7...v0.1.8) (2021-07-12)


### Bug Fixes

* adjust coordinate updating to fix firefox bug ([ab75c02](https://github.com/graasp/graasp-app-post-it-notes/commit/ab75c02f9452f5dd041de8bf60ff91de94b48ac4)), closes [#23](https://github.com/graasp/graasp-app-post-it-notes/issues/23)
* remove unnecessary state variables in NoteFinalView ([66452e8](https://github.com/graasp/graasp-app-post-it-notes/commit/66452e8360878924479c18de1da4adc42755366c))

### [0.1.7](https://github.com/graasp/graasp-app-sticky-notes/compare/v0.1.6...v0.1.7) (2021-07-07)


### Bug Fixes

* add ownership field for online calls ([2193350](https://github.com/graasp/graasp-app-sticky-notes/commit/21933503460fa79f27b4db4c05e4b9a6a66c8299))

### [0.1.6](https://github.com/graasp/graasp-app-sticky-notes/compare/v0.1.5...v0.1.6) (2021-07-02)


### Bug Fixes

* allow everyone to edit resources ([7d671c1](https://github.com/graasp/graasp-app-sticky-notes/commit/7d671c1add161fa30964dddb9703e8692eebbf8f))

### [0.1.5](https://github.com/graasp/graasp-app-sticky-notes/compare/v0.1.4...v0.1.5) (2021-07-01)


### Bug Fixes

* allow collaboration with public resources ([2d4179f](https://github.com/graasp/graasp-app-sticky-notes/commit/2d4179f18037b0a1ee728e61567e75959fc19c36))

### [0.1.4](https://github.com/graasp/graasp-app-post-it-notes/compare/v0.1.3...v0.1.4) (2021-06-30)


### Bug Fixes

* fix small production bugs ([4774d3c](https://github.com/graasp/graasp-app-post-it-notes/commit/4774d3c2c7f62c9e1a1b5d23bb4a9e8450d8d639)), closes [#19](https://github.com/graasp/graasp-app-post-it-notes/issues/19) [#20](https://github.com/graasp/graasp-app-post-it-notes/issues/20) [#21](https://github.com/graasp/graasp-app-post-it-notes/issues/21)

### [0.1.3](https://github.com/graasp/graasp-app-post-it-notes/compare/v0.1.2...v0.1.3) (2021-06-30)


### Features

* add background fetch ([a17692b](https://github.com/graasp/graasp-app-post-it-notes/commit/a17692b268da1ea2aa40efbd472fff6738a80545)), closes [#7](https://github.com/graasp/graasp-app-post-it-notes/issues/7)
* add option to minimize notes ([63c6a9c](https://github.com/graasp/graasp-app-post-it-notes/commit/63c6a9cd5fd555b27772171690e8679214ce4af2)), closes [#14](https://github.com/graasp/graasp-app-post-it-notes/issues/14)
* add sticky note when canvas is clicked ([015a74e](https://github.com/graasp/graasp-app-post-it-notes/commit/015a74e2d7bdb17446c86ce89aa91df165327fe7)), closes [#15](https://github.com/graasp/graasp-app-post-it-notes/issues/15)
* allow background image to be set in teacher mode ([7c08ef4](https://github.com/graasp/graasp-app-post-it-notes/commit/7c08ef496e4df8fb9449053be27b18597f622049)), closes [#10](https://github.com/graasp/graasp-app-post-it-notes/issues/10)
* allow background to be toggled off ([266c058](https://github.com/graasp/graasp-app-post-it-notes/commit/266c05844ebc38b5838286d3d3b0d377050ec75f)), closes [#16](https://github.com/graasp/graasp-app-post-it-notes/issues/16) [#13](https://github.com/graasp/graasp-app-post-it-notes/issues/13)
* store background image in appInstance settings, delete old image on server ([c55d8b1](https://github.com/graasp/graasp-app-post-it-notes/commit/c55d8b1ea289105c85b41a391c884c3b9c26fca2))

### [0.1.2](https://github.com/graasp/graasp-app-sticky-notes/compare/v0.1.1...v0.1.2) (2021-06-17)

### Features

- add functionality to edit and delete notes ([3f3d67a](https://github.com/graasp/graasp-app-sticky-notes/commit/3f3d67a0c51217484dd664d29738ab608553184d)), closes [#3](https://github.com/graasp/graasp-app-sticky-notes/issues/3)
- create initial layout ([3ae97e3](https://github.com/graasp/graasp-app-sticky-notes/commit/3ae97e30cd350b0e49a42056351a2b8748ab80e3)), closes [#1](https://github.com/graasp/graasp-app-sticky-notes/issues/1)
- extract and display user names ([dcee75e](https://github.com/graasp/graasp-app-sticky-notes/commit/dcee75e836497c3daba47c82d9742ce709a8e5f3)), closes [#6](https://github.com/graasp/graasp-app-sticky-notes/issues/6)
- make notes draggable ([4d46981](https://github.com/graasp/graasp-app-sticky-notes/commit/4d46981884833742969cdd04b9d6639ada493cc5)), closes [#2](https://github.com/graasp/graasp-app-sticky-notes/issues/2)
- persist notes to db ([42f2382](https://github.com/graasp/graasp-app-sticky-notes/commit/42f2382e8b1b8ba690e0f704966d59c8a3bb1d9e)), closes [#4](https://github.com/graasp/graasp-app-sticky-notes/issues/4)

### 0.1.1 (2021-06-17)
