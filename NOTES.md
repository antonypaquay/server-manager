# Composants et templates - Avancés

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

### Utilisation du signal viewChild v17.3=<

```
private form = viewChild<ElementRef<HTMLFormElement>>("form");
```

#### Lifecycle méthodes disponible seulement à partir de la v16=< et à utiliser dans le constructor
```
constructor() {
    /* Permet de souscrire un abonement au signal qui normalement dans le contructor n'a pas lieu
      Angular mettra donc en place un abonnement à ce signal et en plus nettoie cette abonnement(destroy)
      quand le composant est détruit */
    effect(() => {
      console.log(this.signalName());
    });
    // Est déclenché après que n'importe quel autres composants de l'application ait été rendu
    afterRender(() => {

    });
    // Est déclenché uniquement quand le prochain élément de l'application est rendu
    afterNextRender(() => {

    });
  }
```

#### Nettoyer l'abonnement créé avec la fonction effect() avec la fonction de rappel onCleanup
Dans la hook onCleanup je dois définir ce qui doit se passer avant que le code de l'effet ne s'exécute la prochaine fois
```
  constructor() {
    effect((onCleanup) => {
      const tasks = getTasks();
      const timer = setTimeout(() => {
        console.log(`Current number of tasks: ${tasks().length}`);
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    }
  }
});
```

#### Mettre en place une liaison bidirectionnelle (Two-Way-Biding) personnalisée
Dans l'exemple si dessous il est important que l'output ait le même nom que l'input + 'Change'
Exemple: sizeChange
```
  @Input({required: true}) size!: {width: string: height: string};
  @Output({required: true}) sizeChange = new EventEmitter<{width: string: height: string}>();
```
***Nouvelle approche pour la liaison bidirectionnelle v17.2=<***
```
  size = input.required<{width: string: height: string}>;
  
  onReset() {
    this.size.set({
      width: '200',
      height: '100',
    });
  }
```

# Directives
