import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockBuilderComponent } from './block-builder.component';

describe('BlockBuilderComponent', () => {
  let fixture: ComponentFixture<BlockBuilderComponent>;
  let component: BlockBuilderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockBuilderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      name: 'John',
      age: 30,
      city: 'New York',
      child: {
        name: 'Ioana',
      },
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('creates one block per top-level primitive value', () => {
    expect(component.keys()).toEqual(['name', 'age', 'city']);
    expect(component.blocks()).toHaveLength(3);
    expect(fixture.nativeElement.textContent).not.toContain('Ioana');
  });

  it('updates the displayed value when the selected key changes', () => {
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;

    select.value = 'age';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const value = fixture.debugElement.query(By.css('.block__value')).nativeElement as HTMLElement;
    expect(value.textContent?.trim()).toBe('30');
  });

  it('adds, removes, and reorders blocks', () => {
    component.addBlock();
    fixture.detectChanges();
    expect(component.blocks()).toHaveLength(4);

    const initialSecondId = component.blocks()[1].id;
    component.moveDown(0);
    fixture.detectChanges();
    expect(component.blocks()[0].id).toBe(initialSecondId);

    const removedId = component.blocks()[0].id;
    component.removeBlock(removedId);
    fixture.detectChanges();
    expect(component.blocks().some((block) => block.id === removedId)).toBe(false);
  });

  it('starts a timer challenge and clears it after the user changes the selected key', () => {
    jest.useFakeTimers();
    jest.spyOn(Math, 'random').mockReturnValue(0);

    fixture.componentRef.setInput('challengeEnabled', true);
    fixture.componentRef.setInput('challengeDelayMs', 10);
    fixture.detectChanges();

    jest.advanceTimersByTime(10);
    fixture.detectChanges();

    expect(component.challengeActive()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Timer challenge');

    const challengedBlockId = component.blocks()[0].id;
    component.updateKey(challengedBlockId, 'age');
    fixture.detectChanges();

    expect(component.challengeActive()).toBe(false);
  });
});
