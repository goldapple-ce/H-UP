## Git Flow

---

![git flow](https://github.com/lkt9899/PS/assets/80976609/16f92f0c-034f-4c94-8b16-5a0796e67d0a)

### branch

- main
- develop (개발용)
- feature (develop에 기능추가용)
    
    ![git branch - feature](https://github.com/lkt9899/PS/assets/80976609/6f7967d0-baa1-48dd-90c9-02987b16bc20)
    
- hotfix (main 브랜치 버그해결용)
    
    ![git branch - hotfix](https://github.com/lkt9899/PS/assets/80976609/0a7a56d9-15bb-4a02-b937-2da0d580d6ae)
    
- release (develop 브랜치를 main 브랜치에 합치기 전에 최종 테스트용)
    
    ![git branch - release](https://github.com/lkt9899/PS/assets/80976609/a7171a97-611f-4303-b321-eacbec9f9cda)
    

## Branch Naming

브랜치의 이름은 다음과 같이 작성합니다.

`Red : mandatory | Blue : optional`
`{github tag}/{domain}/{issue No.}/{developer name}`

1. github tag 는 `feat`, `docs`, `chore`, `fix` 등이 있습니다.
2. issue No.에는 Jira에서 생성한 이슈의 번호가 들어갑니다.
3. 마지막 담당자 이름은 선택 사항입니다.

### 예시

---

- `feat/member/#S10P31A702-127/LKT`
- `fix/schedule/#S10P31A702-131/LKT`