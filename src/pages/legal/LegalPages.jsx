import { usePageMeta } from '../../hooks/usePageMeta'
import { MK } from '../../i18n/mk'

function LegalSection({ title, children }) {
  return (
    <section className="mb-8 last:mb-0">
      <h2 className="text-lg sm:text-xl font-bold text-dark mb-4">{title}</h2>
      <div className="space-y-4 leading-relaxed text-sm sm:text-base text-dark/70">
        {children}
      </div>
    </section>
  )
}

function LegalPage({ title, lastUpdated, children }) {
  usePageMeta({ title })
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="bg-dark py-12 sm:py-16 text-white mb-10">
        <div className="container-base text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{title}</h1>
          {lastUpdated && (
            <p className="mt-3 text-sm text-white/60">Последно ажурирање: {lastUpdated}</p>
          )}
        </div>
      </div>
      <div className="container-base max-w-3xl">
        {/* Draft Notice */}
        <div className="rounded-2xl bg-dark/5 border border-dark/15 p-5 mb-8 text-sm text-dark leading-relaxed">
          <span className="font-bold block mb-1 text-primary">НАЦРТ ДОКУМЕНТ</span>
          Овој текст е во фаза на изработка и сè уште не е правно обврзувачки. Ќе биде финализиран и правно одобрен пред лансирањето на пилот програмата.
        </div>

        {/* Content Box */}
        <div className="rounded-3xl bg-card p-6 sm:p-10 shadow-card border border-border">
          {children}
        </div>
      </div>
    </div>
  )
}

export function TermsPage() {
  return (
    <LegalPage title={MK.legal.terms} lastUpdated="Октомври 2026">
      <LegalSection title="1. Вовед и прифаќање на условите">
        <p>Добредојдовте на PeerUp. Овие Услови за користење ги регулираат вашите права и обврски при користење на нашата платформа за онлајн врсничко менторство.</p>
        <p>Со пристапување, регистрација или користење на веб-страницата, изјавувате дека ги прифаќате овие Услови. Доколку не се согласувате со кој било дел, ве молиме не ја користете платформата.</p>
      </LegalSection>

      <LegalSection title="2. Дефиниции">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Платформа</strong> – веб-страницата PeerUp и сите поврзани сервиси.</li>
          <li><strong>Ученик</strong> – корисник кој резервира и следи лекции преку платформата.</li>
          <li><strong>Ментор</strong> – одобрен корисник кој нуди едукативни услуги на Учениците.</li>
          <li><strong>Старател</strong> – родител или законски застапник на Ученик помлад од 18 години.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Кориснички сметки и безбедност">
        <p>За користење на услугите потребно е креирање на корисничка сметка. Вие сте одговорни за одржување на доверливоста на вашата лозинка.</p>
        <p><strong>За малолетници:</strong> Ученици помлади од 18 години мора да имаат согласност од родител или старател за креирање профил и извршување на плаќања.</p>
      </LegalSection>

      <LegalSection title="4. Однесување на платформата">
        <p>Платформата има нулта толеранција за несоодветно однесување. Корисниците (ученици и ментори) се обврзуваат на:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Почитување и професионална комуникација.</li>
          <li>Забрана за споделување на лични контакти со цел заобиколување на платформата.</li>
          <li>Забрана за снимање на лекциите без изречна дозвола од двете страни.</li>
        </ul>
        <p>PeerUp го задржува правото да суспендира профили кои ги прекршуваат овие правила без претходно предупредување.</p>
      </LegalSection>

      <LegalSection title="5. Плаќања и трансакции">
        <p>Сите плаќања за лекции се извршуваат исклучиво преку интегрираниот безбеден систем за плаќање на PeerUp. Менторите не смеат да бараат директно плаќање од учениците.</p>
      </LegalSection>
    </LegalPage>
  )
}

export function PrivacyPage() {
  return (
    <LegalPage title={MK.legal.privacy} lastUpdated="Октомври 2026">
      <LegalSection title="1. Информации кои ги собираме">
        <p>При користење на PeerUp, собираме податоци неопходни за обезбедување на услугата:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Идентификациски податоци:</strong> Име, презиме, е-пошта и возраст (заради законска согласност).</li>
          <li><strong>Едукативни податоци:</strong> Избрани предмети, ниво на образование и историја на лекции.</li>
          <li><strong>Технички податоци:</strong> IP адреса, тип на прелистувач и логови за користење на платформата.</li>
        </ul>
        <p>Ние <strong>не зачувуваме</strong> податоци од платежни картички. Сите трансакции се процесираат преку сертифицирани безбедни провајдери.</p>
      </LegalSection>

      <LegalSection title="2. Како ги користиме податоците">
        <p>Вашите информации се користат исклучиво за:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Поврзување на ученици со соодветни ментори.</li>
          <li>Олеснување на комуникацијата и испраќање линкови за лекции.</li>
          <li>Техничка поддршка и подобрување на корисничкото искуство.</li>
          <li>Спречување на измами и одржување на безбедноста на корисниците.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Споделување на информации">
        <p>PeerUp никогаш нема да ги продаде вашите лични податоци на трети страни. Податоците се споделуваат само со:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Провајдери на услуги (хостинг, сервиси за плаќање) под строги договори за доверливост.</li>
          <li>Официјални институции, доколку тоа е законски наложено.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Заштита на децата">
        <p>Приватноста на малолетниците е наш приоритет. Профилите на ученици под 18 години се управувани со родителска контрола.</p>
      </LegalSection>

      <LegalSection title="5. Вашите права">
        <p>Имате право да побарате пристап до вашите податоци, нивна исправка или целосно бришење на вашиот профил. За овие барања, контактирајте нè на <strong>contact@peerup.mk</strong>.</p>
      </LegalSection>
    </LegalPage>
  )
}

export function CancellationPage() {
  return (
    <LegalPage title={MK.legal.cancellation} lastUpdated="Октомври 2026">
      <LegalSection title="1. Општи правила">
        <p>Свесни сме дека плановите можат да се променат. Нашата политика за откажување е дизајнирана да биде фер кон времето на менторите, но и флексибилна за учениците.</p>
      </LegalSection>

      <LegalSection title="2. Откажување од страна на Ученикот">
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Повеќе од 24 часа пред лекцијата:</strong> Целосно бесплатно откажување или презакажување. Сумата се рефундира во целост.</li>
          <li><strong>Помеѓу 12 и 24 часа пред лекцијата:</strong> Опција за презакажување на друг термин, или откажување со рефундација од 50%.</li>
          <li><strong>Помалку од 12 часа пред лекцијата:</strong> Рефундирање не е можно, бидејќи менторот го резервирал своето време.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Откажување од страна на Менторот">
        <p>Доколку менторот е принуден да ја откаже лекцијата:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Ученикот добива <strong>100% целосно рефундирање</strong> веднаш.</li>
          <li>Менторите кои често ги откажуваат лекциите во последен момент подлежат на пенали и суспензија на нивниот профил.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Доцнење и Непојавување">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Ученик:</strong> Менторот ќе чека максимум 15 минути. Доколку ученикот не се појави во овој период, лекцијата се смета за одржана.</li>
          <li><strong>Ментор:</strong> Доколку менторот не се појави 10 минути по почетокот, ученикот треба да пријави за целосно рефундирање.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Технички проблеми">
        <p>Доколку лекцијата не може да се одржи поради сериозни технички проблеми со платформата или сервисите како Google Meet, лекцијата ќе биде презакажана бесплатно.</p>
      </LegalSection>
    </LegalPage>
  )
}
