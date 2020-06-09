# Making Rabbit Project

# Todo list

## QR code provider

- code-128 barcode generator
- QR code generator
- label printer
- data encryption

## QR code reader

- QR code reader
- Barcode reader
- data encryption from server

## data encryption api server

- api authentication
- data encryption
- traffic metering

## customer portal

- Account Membership
- API key management

## admin console

- Customer Management
- Statistics

# 요소 기술 검토

## 일차원 바코드 암호화

- AES256 CTR No Padding 모드로 적용
- AES CBC 등 기타 블럭모드는 패딩 처리가 되어 문자열 인코딩 시 사이즈가 더욱 커짐 (24 이상)

## 문자열 인코딩 처리

- AES256 암호화 된 Bytes를 BASE64로 문자열 인코딩
- 일차원 바코드를 위한 길이 20 Bytes 이하 문자열로 처리하기 위해서는 암호화 할 문자 입력 값을 14이하로 해야 함
  format: VERSION [1 byte] + CODE_TYPE [1 byte] + PASSPORT INFO [MAX 13 bytes]
  1차원 바코드 용 타입 1: 국적 + 여권번호
  1차원 바코드 용 타입 2: 국적 + 여권번호 + 성명
  QR 코드 용 타입 A: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일
  QR 코드 용 타입 B: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일 + 입국일자

## Client 암호화 모듈

- JAVA 1.8 crypto 패키지 이용해서 "AES/CTR/NoPadding" 모드로 라이브러리 만들어 Jar로 배포

## Server 복호화 모듈

- NodeJS crypto 패키지 이용해서 client 동일 방식으로 복호화 처리

## API server 인증 기능

- Token 기반 인증 구현 (JWT)
- Web portal에서 가입한 사용자의 MY page에 발급된 clientId, clientSecret으로 HTTB basic으로 인증
- 인증 OK 경우 JWT 기반 accessToken, refreshToken 발급
