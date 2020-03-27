import React from 'react';
import styles from './RegisterForm.scss';
import classNames from 'classnames/bind';
import {
  Input,
  SelectCurrency,
  Button,
  AlignRight,
  Paper,
  MoneyOption
} from 'components';

const cx = classNames.bind(styles);

const RegisterForm = ({
  displayName,
  onChangeDisplayName,
  onSetCurrency,
  currency,
  optionIndex,
  onSetOptionIndex,
  onSubmit,
  onDisplayNameBlur,
  displayNameExists
}) => {
  return (
    <Paper>
      <h1>회원정보입력</h1>
      <p>거의 다 끝났습니다. 필요한 몇 가지 정보를 입력하세요.</p>
      <h3>닉네임</h3>
      <Input
        value={displayName}
        onChange={onChangeDisplayName}
        onBlur={onDisplayNameBlur}
      />
      {displayNameExists && (
        <p className={cx('exists')}>이미 존재하는 닉네임입니다.</p>
      )}
      <h3>초기자금 설정</h3>
      <p>
        초기자금을 설정하세요. {'\r\n'}
        초기자금은 언제든지 설정페이지에서 초기화 할 수 있습니다.
      </p>
      <h4>화폐 선택</h4>
      <SelectCurrency currency={currency} onSetCurrency={onSetCurrency} />
      <h4>금액 선택</h4>
      <MoneyOption
        currency={currency}
        optionIndex={optionIndex}
        onSetOptionIndex={onSetOptionIndex}
      />
      <AlignRight>
        <Button
          className={cx('login-btn', 'complete')}
          disabled={displayNameExists}
          onClick={onSubmit}
        >
          완료
        </Button>
      </AlignRight>
    </Paper>
  );
};

export default RegisterForm;
