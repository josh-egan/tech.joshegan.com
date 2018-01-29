## Resources

- Pluralsight Courses
    - [TypeScript Fundamentals](https://app.pluralsight.com/library/courses/typescript)
    - [TypeScript In-depth](https://app.pluralsight.com/library/courses/typescript-in-depth)
    - [Advanced TypeScript](https://app.pluralsight.com/library/courses/typescript-advanced)
- http://www.typescriptlang.org/
- http://www.typescriptlang.org/docs/
- http://www.typescriptlang.org/samples/
- http://www.typescriptlang.org/playground/

## Syntax

### Types

Built in types include: 
- `boolean`
- `string`
- `number`
- `any`

### Operators

Operator | Description
--- | ---
: | Used to separate a variable from its type.

### Keywords

Keyword | Description
--- | ---
class | Used to define a class.
constructor | Used to define the constructor function for a class.

### Examples

```typescript
class Car {
  engine: string;
  
  constructor (engine: string) {
    this.engine = engine;
  }
  
  // Note that methods on a class do not require the `function` keyword at the beginning of the line.
  start() {
    alert('Engine started: ' + this.engine);
  }
}
```

```typescript
// type inference is automatically used when a variable is created and assigned a primitive value.
// types can also be explicitly declared for a variable.
const foo = 'some string';
const bar: boolean = 'some string' === foo;
```
