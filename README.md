링크 : https://juo1221.github.io/pagination-oop/index.html

# pagination-oop 연습

![p](https://user-images.githubusercontent.com/79268108/144110128-998c43e6-0277-45e1-ace8-3c07627cf660.png)

## 기능 & 조건 

1. 유효성 검사 ( 미 통과 시 프로그램 종료 )

   - 숫자인지 검사
   - 10,000 이내인지

2. 페이지 동적 생성

   - 입력 된 값에 따라 계속 새로운 페이지 생성

3. 기본값 && 유효성 검사 ( 미 통과시 기본값 적용 )

   - 현재 페이지 : 1

   - 전체 리스트 : 50개

   - 페이지당 리스트 : 10개

   - pagination의 최대 개수는 10개 

   - 0 유효성 검사 (전체 리스트는 0 입력 가능 )

     Ex1)  
     전체리스트 : 0,  페이지당 리스트 : 10 입력 시  
     전체리스트 : 0,  페이지당 리스트 : 10 적용  

     Ex2)  
     전체리스트 : 100,  페이지당 리스트 : 0 입력 시  
     전체리스트 : 100, 페이지당 리스트 : 10 적용

   - 음수 유효성 검사

     Ex1)  
     전체 리스트 : -100,  페이지당 리스트 : 20 입력 시
     전체 리스트 : 50,  페이지당 리스트 : 20 적용

     Ex2)  
     전체 리스트 : 100,  페이지당 리스트 : -50 입력 시  
     전체 리스트 : 100,  페이지당 리스트 : 10 적용

     Ex3)  
     전체 리스트 : -100,  페이지당 리스트 : -50 입력 시  
     전체 리스트 : 50, 페이지당 리스트 : 10 적용

     

4. 상태 변경

   - 이동 버튼 클릭 시 현재 페이지 1씩 증감소 (재렌더링)
   - 특정 페이지 클릭 시 현재 페이지로 설정 (재렌더링)
   - 마지막 페이지 도달 시 next 버튼 제거 
   - 첫 페이지 도달 시 prev 버튼 제거
