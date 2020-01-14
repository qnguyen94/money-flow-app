# As a **_`user`_**, I want the following functionalities from this app:

> #### Dashboard page

* -----------------------------------------------------------------------------------
    * **_summaries_** of **_income_**, **_expenses_**, and **_money flow_**

        * income card links to **_`income page`_**

        * expense card links to **_`expense page`_**
        
        * money flow card show **_money flow summary_**

---

> #### Income Page

* -----------------------------------------------------------------------------------
    * A component showing **_`total income`_**

    * A component to **_`add income source`_**

    * Components (cards) showing registered income sources
        * **_`Editable income source`_**

    * A component links back to **_`dashboard_page`_**

---
> #### Expense Page

* -----------------------------------------------------------------------------------
    * A component showing **_`total expense`_**

    * Components (cards) showing `registered expenses`
        * Has **_`category`_** (from template category object)
        * Has **_`expense name`_** (load from template category object)
        * Has **_`expense amount`_**

    * A component to `add expense`
        * Has **_`category`_** input (from template category object)
            * Has option to use **_`other_expense_category`_** that put everything to an "other" card.
        * Has **_`expense name`_** input (load from template category object)
            * Has option to use **_`other_expense_name`_** that generate a textbox for input.
        * Has **_`expense amount`_** input

    * A component links back to **_`dashboard_page`_**

---
> #### Functionalities
* -----------------------------------------------------------------------------------
    * Able to **_`add, delete, clear`_** income sources.
    * Able to **_`add, delete, clear`_** expenses.
    * Total of income and expenses **_`updated and displayed`_** with every related operation.
    * Money Flow **_`updated and displayed`_** with every operation.

---
> #### Optional Functionalities
* -----------------------------------------------------------------------------------
    * **_`Pie chart`_** charts showing breakdowns of income and expenses.
    * **_`Line/Area chart`_** showing impact of income and expenses on money flow. 