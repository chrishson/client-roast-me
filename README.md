## Prettier Setup

1. Install the **Prettier - Code formatter** extension
2. Add the following to your **settings.json** file for **User**:
    ```
    {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "prettier.tabWidth": 4
    }
    ```
3. If prompted for a configuration language, select **TypeScript React**
4. Test if Prettier is formatting your code on save by making changes to your code and hitting CTRL+S / CMD+S
