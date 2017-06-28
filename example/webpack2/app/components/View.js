import React from 'react';
import { translate, Interpolate } from 'react-i18next';
import AnotherComponent from './AnotherComponent';
import YetAnotherComponent from './YetAnotherComponent';
import i18n from '../i18n';

import Trans from './Trans';

function Link({ to, children }) {
  return <a href={to}>{children}</a>;
}

@translate(['view', 'nav'], { wait: true })
class TranslatableView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 3000);
  }

  render() {
    const { t } = this.props;
    const { show } = this.state;

    let interpolateComponent = <strong>"a interpolated component"</strong>;
    const toggle = lng => i18n.changeLanguage(lng);

    const count = 10;
    const name = 'Arthur';

    return (
      <div>
        <h1>{t('common:appName')}</h1>

        <Trans i18nKey="transTest" count={count}>
          Hello <strong title={t('nameTitle')}>{{name, format: 'uppercase'}}</strong>, you have {{count}} message. Open <Link to="/msgs">here</Link>.
        </Trans>

        <button onClick={() => toggle('de')}>{t('nav:linkDE')}</button>
        <button onClick={() => toggle('en')}>{t('nav:linkEN')}</button>
        {
          show && <AnotherComponent />
        }
        <YetAnotherComponent />
        <Interpolate parent='p' i18nKey='common:interpolateSample' value='"some value in props"' component={interpolateComponent} up='something to uppercase' />
        <Interpolate parent='p' i18nKey='common:interpolateSample' useDangerouslySetInnerHTML={true} value='"some value in props"' component={interpolateComponent} up='something to uppercase' />
        <a href='https://github.com/i18next/react-i18next' target='_blank'>{t('nav:link1')}</a>
      </div>
    )
  }
}

export default TranslatableView;
