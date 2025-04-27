import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { WINDOW_REF } from '@app/core/utils/window-ref';
import { IPartner } from '@app/static/types/general.type';

/**
 * This component is used to display the partner page.
 */
@Component({
  selector: 'summeet-partner-page',
  standalone: true,
  imports: [MatDividerModule, MatCardModule, CommonModule],
  templateUrl: './partner-page.component.html',
  styleUrls: ['./partner-page.component.scss'],
})
export class PartnerPageComponent implements OnInit {
  @ViewChild('videoPlayer') public videoplayer!: ElementRef;
  public target = document.querySelector('#promo');
  public currentAnchor!: string;
  public currentPartnerData!: IPartner;
  public amgen = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/amgen_logo.png',
    description1: `<span>
        <p>Poslaním spoločnosti Amgen je slúžiť pacientom. Posúvame hranice vedy ďalej, s cieľom zlepšiť zdravie a zachrániť život.</p></span>`,
    linkName: 'www.amgen.sk',
    link: 'https://www.amgen.sk/',
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/amgen_inzercia1.png',
    ],
  };
  public mds = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/MSD_logo.png',
    description1: `<span><p>Spoločnosť MSD má definované jasné ciele. „Využívame silu špičkovej vedy na záchranu a zlepšovanie životov ľudí na celom svete. Už viac ako 130 rokov prinášame ľudstvu nádej prostredníctvom vývoja dôležitých liekov a vakcín.“</p>
        <p>MSD je poprednou svetovou biofarmaceutickou spoločnosťou v oblasti výskumu a dnes sme na čele výskumného snaženia, ktoré prináša inovatívne riešenia v oblasti zdravia napomáhajúce prevencii a liečbe ochorení u ľudí a zvierat. Pracujeme zodpovedne každý deň, aby sme umožnili bezpečnú, udržateľnú a zdravú budúcnosť pre všetkých ľudí a komunity.</p>
        <p>Za viac ako tri desaťročia pôsobenia priniesla spoločnosť MSD na Slovensko prelomovú liečbu rôznych typov ochorení v oblasti onkológie, diabetológie či vakcín a prispela k riešeniu naliehavých problémov v zdravotníctve.</p></span>`,
    linkName: 'www.msd.sk',
    link: 'https://www.msd.sk/',
    videoCDNUrl: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/MSD_video.mp4',
    ],
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/MSD_inzercia.png',
    ],
  };
  public teva = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/teva_logo.png',
    description1:
      '<span><p>Farmaceutická spoločnosť Teva je najväčšia „svetová lekárnička“ s viac ako 1 800 liekmi. Má kompletný sortiment výrobkov od generík, voľne predajných liekov až po originálne a biologické liečivá. Zameriava sa na terapeutické oblasti ako je migréna a bolesť hlavy, ochorenia pohybového ústrojenstva a neurodegeneratívne ochorenia, bolesť, ochorenia dýchacieho aparátu, ochorenia kardiovaskulárneho aparátu, onkológia. Firma Teva má globálny dosah, pôsobí na 60 trhoch, jej celosvetové portfólio obsahuje viac ako 16 000 produktov. Firma Teva má plne integrovaný výskum a vývoj na 25 výskumných pracoviskách a mám 74 výrobných závodov. Každoročne vyrobí viac ako 120 miliárd tabliet a kapsúl a tým pomôže každý deň 200 miliónom ľudí po celom svete.</p></span>',
    linkName: 'www.onkoplo.cz',
    link: 'https://www.onkoplo.cz/',
    videoCDNUrl: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/teva_video.mp4',
    ],
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/teva_inzercia3.png',
    ],
  };
  public sandoz = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Sandoz_logo.png',
    description1:
      '<span><p>Sandoz je svetovým lídrom v oblasti generických a biosimilárnych liekov zaväzujúcim sa zohrávať vedúcu úlohu pri podpore prístupu k liekom na celom svete. Má dlhodobú históriu v oblasti inovácií s cieľom zlepšiť prístup ku kvalitným a dostupným liekom pre milióny pacientov na celom svete.</p></span>',
    linkName: 'www.sandoz.sk',
    link: 'https://www.sandoz.sk/',
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Sandoz_inzercia2.png',
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Sandoz_inzercia1.png',
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Sandoz_inzercia3.png',
    ],
  };
  public zentiva = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/ZENTIVA_logo.png',
    description1: `<span><p>Korene Zentivy siahajú viac ako 500 rokov do minulosti, do malej lekárne s názvom Čierny orol, ktorá dodnes existuje v centre Prahy v Českej republike.</p>
        <p>Praha je stále srdcom diania ako globálne sídlo spoločnosti Zentiva. Z Prahy riadime činnosť 31 dcérskych spoločností a 7 pobočiek s aktívnou činnosťou až v 35 krajinách, s podporou tímu  takmer 4800 ľudí. Rôznorodosť nášho tímu je veľmi silnou stránkou, všetkých nás spája cieľ zabezpečiť dodávky vysokokvalitných a cenovo dostupných liekov ľuďom v  Európe i mimo nej.</p>
        <p>V roku 2018 sa spoločnosť Zentiva stala nezávislou spoločnosťou, za ktorou stojí spoločnosť Advent International.</p>
        <p>Od roku 2020 sme rozšírili naše podnikanie na nové územia v Európe a doplnili naše portfólio v hlavných terapeutických oblastiach.</p>
        <p>V priebehu štyroch rokov sa nám podarilo zdvojnásobiť veľkosť spoločnosti, rozšíriť geografickú pôsobnosť na celú Európu a pokryť hlavné terapeutické oblasti a štandardné liečebné postupy.</p>
        <p>Tým, že ponúkame naše výrobky a služby vo vysokej kvalite a zároveň za prijateľnú cenu, výrazne prispievame k verejnému zdraviu.</p></span>
        `,
    linkName: 'www.zentiva.sk',
    link: 'https://www.zentiva.sk/',
    videoCDNUrl: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/zentiva_video.mp4',
    ],
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/zentiva_inzercia1.png',
    ],
  };
  public takeda = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/takeda_logo.png',
    linkName: 'www.takeda4health.sk/',
    link: 'https://takeda4health.sk/',
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/takeda_inzercia.png',
    ],
  };
  public glenmark = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/glenmark_logo.png',
    linkName: 'www.glenmarkpharma.sk',
    link: 'https://www.glenmarkpharma.sk/',
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Glenmark_inzercia.png',
    ],
  };
  public jansse = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Jansse_logo.png',
    description1: `<span>
        <p>Počas posledného polstoročia sme zjednotili skupinu inovatívnych farmaceutických spoločností, ktoré spája spoločné poslanie: pomenovať a riešiť niektoré z najdôležitejších medicínskych požiadaviek našej doby.</p>
        <p>Spoločnosť Johnson & Johnson sa zameriava na vývoj prelomových liečebných metód v terapeutických oblastiach ako imunológia, infekčné ochorenia, neuropsychiatria, onkológia a kardiovaskulárne a metabolické ochorenia</p>
        <p>Naše produktové portfólio ponúka riešenia aj pre ostatné významné oblasti ľudského zdravia.</p>
        <p>Patríme do korporácie Johnson & Johnson a v súčasnosti zamestnávame 40 000 zamestnancov na 5 kontinentoch sveta. Náš objem investícií do výskumu a vývoja dosahuje ročne približne 4,5 miliárd USD. Spoločnosť patrí medzi Top 10 firiem vo veľkosti predajov.</p>
        <p>V regióne EMEA (Európa, Stredný Východ a Afrika) máme zastúpenie vo vyše 30 krajinách a zamestnávame viac ako 14 000 zamestnancov. Naše investície do výskumu a vývoja v tvoria ročne 1,5 miliárd eur. Pomáhame ľuďom - využívame naše vedomosti a zdroje, vkladáme silu a nádej do vedy, aby sme predĺžili život a zvýšili jeho kvalitu.</p>
        <p>V spoločnosti Janssen využívame vedecké poznatky a pomáhame pacientom na celom svete.</p>
        <p>Svet zdravotnej starostlivosti je charakterizovaný informovanými a akcieschopnými pacientmi, ktorí chcú prístup k najlepšej dostupnej liečbe za prijateľnú cenu. Nové terapeutické riešenia pre nenaplnené medicínske potreby budú rozvíjané prostredníctvom partnerstiev so zástupcami priemyslu, akademickej obce, vlády, odborníkov z oblasti zdravotnej starostlivosti a pacientov.</p>
        <p>V takomto prostredí bude spoločnosť Johnson & Johnson na čele fundamentálnej zmeny spôsobu, akým sa pristupuje k ochoreniam.</p>
        <p>V rámci nášho pevného záväzku voči pacientom budeme budovať inovatívne, integrované riešenia zdravotnej starostlivosti, ktoré obnovia a zvýšia kvalitu života, pričom budeme vytvárať ekonomickú hodnotu pre spoločnosť a našu firmu. Tento cieľ dosiahneme prostredníctvom toho, že budeme pracovať bok po boku s partnermi z oblasti zdravotnej starostlivosti a stavať na talente našich ľudí.</p>
        <p>Hodnoty nášho kréda využívame ako náš morálny kompas:</p>
        <p>Budeme vyvíjať udržateľné, integrované riešenia zdravotnej starostlivosti prostredníctvom spolupráce s pacientmi, lekármi a ostatnými partnermi, vychádzajúc pritom z partnerstiev postavených na dôvere a transparentnosti. Budeme naďalej investovať do našich ľudí, aby mohli realizovať svoj osobný rast a budeme naďalej do budúcnosti vytvárať lídrov.</p>
        </span>`,
    linkName: 'www.janssen.com/slovakia/uvod',
    link: 'https://www.janssen.com/slovakia/uvod',
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/jonhson_inzercia.png',
    ],
  };
  public novartis = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Novartis_logo.jpeg',
    videoCDNUrl: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/novartis_video1.mp4',
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/novartis_video2.mp4',
    ],
  };
  public astrazeneca = {
    bgImg:
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners-no-bg.jpg',
    logo: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/AstraZeneca_logo.jpeg',
    description1:
      '<span><p>AstraZeneca je globálna, inovatívna, originálna biofarmaceutická spoločnosť. Vychádzame a riadime sa vedou s hlavným cieľom prinášať lieky, ktoré menia či zlepšujú životy pacientom a majú prínos pre celú spoločnosť.</p></span>',
    linkName: 'www.astrazeneca.sk',
    link: 'https://www.astrazeneca.sk/',
    portfolioImg: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/astrazeneza_inzercia1.png',
    ],
    videoCDNUrl: [
      'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/astrazeneca_video.mp4',
    ],
  };

  private readonly route = inject(ActivatedRoute);
  private readonly window = inject(WINDOW_REF);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      switch (params['id']) {
        case 'amgen': {
          this.currentPartnerData = this.amgen;
          break;
        }
        case 'msd': {
          this.currentPartnerData = this.mds;
          break;
        }
        case 'teva': {
          this.currentPartnerData = this.teva;
          break;
        }
        case 'sandoz': {
          this.currentPartnerData = this.sandoz;
          break;
        }
        case 'zentiva': {
          this.currentPartnerData = this.zentiva;
          break;
        }
        case 'takeda': {
          this.currentPartnerData = this.takeda;
          break;
        }
        case 'johnsonjohnson': {
          this.currentPartnerData = this.jansse;
          break;
        }
        case 'novartis': {
          this.currentPartnerData = this.novartis;
          break;
        }
        case 'astrazeneca': {
          this.currentPartnerData = this.astrazeneca;
          break;
        }
        case 'glenmark': {
          this.currentPartnerData = this.glenmark;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.createObserver(document.querySelector('#promo'), this.callback);
  }

  /**
   * This method is called when the video is toggled.
   * @returns {void}
   */
  public toggleVideo(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.videoplayer.nativeElement.play();
  }

  /**
   * This method is called when the anchor is clicked.
   * @param {string} elementId - The element id.
   * @returns {void}
   */
  public onAnchorClick(elementId: string): void {
    this.currentAnchor = elementId;
    // eslint-disable-next-line unicorn/prefer-query-selector
    document.getElementById(elementId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  /**
   * This method is called when the partner is navigated.
   * @returns {void}
   */
  public navigate(): void {
    if (this.currentPartnerData.link) {
      this.window.open(this.currentPartnerData.link, '_blank');
    }
  }

  /**
   * This method is called when the video is played.
   * @param {IntersectionObserverEntry[]} entries - The intersection observer entries.
   * @returns {void}
   */
  public callback(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (document.querySelector('#videoPlayer') as HTMLVideoElement).play();
      } else {
        (document.querySelector('#videoPlayer') as HTMLVideoElement).pause();
      }
    }
  }

  /**
   * This method is called when the observer is created.
   * @param {HTMLElement | null} target - The target element.
   * @param {IntersectionObserverCallback} callback - The callback function.
   * @returns {void}
   */
  public createObserver(
    target: HTMLElement | null,
    callback: IntersectionObserverCallback,
  ): void {
    const options = {
      root: null,
      threshold: 1,
    };
    const observer = new IntersectionObserver(callback, options);
    if (target) {
      observer.observe(target);
    }
  }

  /**
   * This method is called when the keydown event is triggered.
   * @param {KeyboardEvent} event - The keyboard event.
   * @param {string} anchor - The anchor.
   * @returns {void}
   */
  public handleKeydown(event: KeyboardEvent, anchor: string): void {
    // Trigger the same action when Enter or Space is pressed
    if (event.key === 'Enter' || event.key === ' ') {
      this.onAnchorClick(anchor);
    }
  }
}
