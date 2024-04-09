## Github Commit

`Github Commit` 은 [다음](https://velog.io/@shin6403/Git-git-%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)을 참고하여 작성하였습니다.

### Commit 구조

---

커밋 메시지의 구조는 아래와 같이 이루어져 있습니다.

1. Part
2. Type
3. Name
4. Body
5. Footer

### Part

---

| BE  | Back-End  |
| --- | --------- |
| FE  | Front-End |

### Type

---

타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 합니다.

태그의 종류는 다음과 같습니다.

| 기능       | 설명                                                                 |
| ---------- | -------------------------------------------------------------------- |
| chore      | 빌드 업무 수정, 패키지 매니저 수정                                   |
| docs       | 문서 (documentation)                                                 |
| feat       | 새로운 기능 (feature)                                                |
| fix        | 버그 수정                                                            |
| perf       | 성능을 향상시키는 코드 변경                                          |
| refactor   | 리팩터링 (새로운 기능이나 버그를 수정하는 코드 변경이 아님)          |
| style      | 형식 (코드 작동에 영향을 주지 않는 변동, 코드 포맷팅, 세미콜론 누락) |
| design     | CSS 등 사용자 UI 변경                                                |
| test       | 테스트 코드 추가                                                     |
| ing (지양) | 미완성 코드                                                          |

제목을 작성할 때 주의할 점은 다음과 같습니다.

- 제목의 처음은 동사 원형으로 시작하고 첫 글자는 대문자로 작성한다.
- `Fixed`, `Added`, `Changed`등 과제 시제가 아닌 `Fix`, `Add`, `Change`로 명령어로 시작한다.
- 총 글자 수는 50자 이내며 마지막에 마침표(`.`)를 붙이지 않는다.

> 예시 ) Docs: Edit Readme.md to include New Features Use-Cases
> 
- 커밋 컨벤션 추가

### Body

---

- 본문은 커밋의 상세 내용을 작성한다.
- 본문 내용은 어떻게 변경했는지 보다 무엇을 변경했는지 또는 왜 변경했는지를 설명한다.
- 제목과 본문 사이에 한 줄 비운다.
- 본문은 한줄에 72자 이내로 작성한다.
- 한 줄을 띄워 문단으로 나누거나 불렛을 사용해 내용을 구분한다.

### Footer

---

- 꼬리말에는 이슈 트래커 ID를 추가한다.
- 여러 개의 이슈 번호를 적을 때는 쉼표(`,`)로 구분한다.
- 이슈 트래커 유형은 다음 중 하나를 사용한다.
    - `Fixed`: 이슈 수정중 (아직 해결되지 않은 경우)
    - `Resolves`: 이슈를 해결했을 때 사용
    - `Ref`: 참고할 이슈가 있을 때 사용
    - `Related to`: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)

### Name

---

- commit한 사람의 이름 이니셜을 추가한다.

### Commit 예시

```
Feat: 회원 가입 기능 구현

SMS, 이메일 중복확인 API 개발

Resolves: #123
Ref: #456
Related to: #48, #45
```

# 커밋 템플릿 적용

---

```
💡 템플릿에서 필요한 경우 본문, 꼬릿말도 작성하나 제목만 작성해도 무관
```

1. 프로젝트 루트 폴더 ( ..\S10P12A708\ )에서 아래 명령어 실행

```bash
git config commit.template .gitmessage
```

1. 실행 후 모습
    1. in IntelliJ
        
        ![Untitled](https://github.com/lkt9899/PS/assets/80976609/606141a1-2dc5-4155-8b74-cb6afee9799c)
        
    2. in terminal
        
        ```bash
        git add ../{path}/{someFile}
        git commit
        ```
        
        ![Untitled](https://github.com/lkt9899/PS/assets/80976609/8c3b4d3d-d7c4-4487-be8d-5dc87792fa30)
        
        위 사진 처럼 열린 경우 메세지 작성 후 창 닫으면 커밋됨
        
    3. 위처럼 vscode로 열리지 않고 콘솔 창에서 vim으로 열린 경우
        
        ```markdown
        - i    문자 입력
        - :wq  저장 후 나가기
        - q!   저장 없이 강제 종료
        - dd   행 삭제
        
        1. i 누르고 메세지 입력
        2. ESC
        3. :wq 입력
        ```