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

## Lier des classes ou du styles à un élement HTML dynamiquement

Usage simple pour une seule classe unique
```
  <div [class.active]="isActive"></div> 
```
Usage pour ajouter plusieurs classes en même temps
```
  <div [class]="{
    active: isActive
    'is-active': isActive,
    'is-disabled': isDisabled,
    'is-unknown': isUnknown,
  }"></div> 
```
Usage simple pour un seul style unique
```
  <div [style.fontSize]="'16px'"></div>
```
```
Usage multiple pour ajouter plusieures régles de styles
```
  <div [style]="{
    'font-size': '16px'
    'line-height': '20px'
  }"></div>
```

### Alternative au ngOnDestroy() v16=<
En utilisant le destroyRef
```
  private destroyRef = inject(DestroyRef);
  
  ngOnInit() {
    // Peut-être utiliser dans n'importe quelles méthodes du cycle du vie ou autres
    this.destroyRef.onDestroy() {
      clearInterval(this.interval);
    }
  }
```

