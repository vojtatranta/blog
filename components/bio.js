import React from 'react'

import icn from '../helpers/react-helper'

import styles from '../css/app.css'


export default class Bio extends React.Component {

  render() {
    return (
      <article className="section-content">
        <h2 className={icn([styles['color-bio'], styles['article-heading']])}>Bio</h2>
        <p className={styles.featured}>
          Jmenuji se <strong>Vojtěch Tranta</strong>. Od roku 2009 mě živí vývoj webových aplikací.
          Baví mě projekty, které dávají smysl.
        </p>
        <p>
          Jako ten, kdo uměl s Wordem na mě před lety zbyla povinnost spravovat webové stránky jedné neziskové organizace.
          Tato organizace se rozrůstala a rozvíjela a tak bylo potřeba na jednoduchý statický web začít přidávat animace, formuláře, přihlašovací atd.
        </p>
        <p>
          No a už jsem byl v tom.
        </p>
        <p>
          Jakmile jsem udělal pro jednoho známého, začali se ozývat další a další a měl jsem tolik klientů, že jsem si založil živnost a poslezé nastoupil do své první práce v Abuco, s. r. o.
        </p>
        <h3 className={styles['third-heading']}>Profesionální vývoj</h3>
        <p>
          Profesionální vývojářská práce byla natolik zajímavá a naplňující, že jsem se jí rozhodl věnovat na plný úvazek.
        </p>
        <p>
          Abucu jsme vyvíjeli klasické komerční portály, převážně v CMS Drupal, se kterým mám tedy více než dvouleté zkušenosti.<br/>
          Nejvíce používaným programovacím jazykem bylo PHP.
        </p>
        <p>
          Po roce a půl v Abucu jsem nastoupil na pozici Junior Python + Frontend vývojář do firmy Usertechnologies.
        </p>
        <p>
          Zde byla hlavní náplní práce vyvíjení velkých backendových aplikacích ve frameworku Django. Frontent pak byl postaven na
          Google Closure v Coffee scriptu, CSS jsme psali v Sassu.
        </p>
        <p>
          V Usertechnologies jsem zaznamenal raketový rozvoj svých znalostí o vývoji softwareu. Za to vděčím kolegům Ing. Lukáši Rychteckému, Ing. Luboši Mátlovi a Ing. Jiřímu Zamazalovi. Díky.
        </p>
        <h3 className={styles['third-heading']}>Součanost</h3>
        <p>
          Můj odchod z Usertechu byl zapříčiněn přikloněním se spíše na stranu frontendu, nadále se ale považuji za fullstack vývojáře.
        </p>
        <p>
          Od září 2015 jsem ve společnosti Avocode, která vyvíjí stejnojmenný produkt. S kolegou Janem Kůčou mám na starosti přepracování codebase aplikace do nové udržitelné, reaktivní podoby,
          která bude reflektovat nejnovější trendy ohledně SPA Javascriptových aplikací.
        </p>
        <h3 className={styles['third-heading']}>S čím Vám mohu pomoci</h3>
        <p>
          Nejsem nijak úzce specializovaný na určitou výseč webového vývoje. Myslím si, že ze všech sfér zvládám určitou část.
          Dovedu web nakódovat podle BEM postupu, vytvořím Vám RESTovou SPA aplikaci s backendem v jazycích Javascript, PHP nebo Python, případně i Java.
          Sám si nastavím virtuální server EC2 na Amazon AWS. Vytvořím konfigurační soubor pro supervizor, aby dokázal spouštět celý server s kompletně celou aplikací.
          Před Python postavím NGINX společně s UWSGI. PHP mi pohání php-fpm. Většina mých serverů je zabezpečena certifikáte letsencrypt.org a samozřejmě běží na HTTP/2.
          Jako databáze používám nejraději řešení PostgreSQL, v případě menších aplikací MySQL nebo DynamoDB. Dokážu také spravovat DNS záznamy pro weby. S nastavením mailserveru jsem ještě nepřišel do styku.
        </p>
      </article>
    )
  }

}
