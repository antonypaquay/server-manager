## Écouter des événements sur l'élément host

#### Ancienne méthode
En utilisant un décorateur et en passant en argument le nom de l'événement à lier
```
  @Component({
    ...configuration
  })
  export class ButtonComponent() {
    @HostListener('click')
    onClick() {
      console.log('Clicked!);
    }
  }
```

#### Nouvelle méthode récommandé par l'équipe Angular
En mettant à jour la configuration du composant ainsi
```
  @Component({
    ...configuration
    host: {
      '(click)': 'onClick()'
    }
  })
  export class ButtonComponent() {
    onClick() {
      console.log('Clicked!);
    }
  }
```

#### Accéder aux informations de l'élément host 
Attention qui n'est pas conseillé de modifier les informations liées à l'élément host directement
```
  @Component({
    ...configuration
    host: {
      '(click)': 'onClick()'
    }
  })
  export class ButtonComponent() {
    
    private el = inject(ElementRef);
  
    onClick() {
      console.log(this.el);
    }
  }
```
