import type { WidgetProps } from '@rjsf/utils';
import type { IconKey } from '@erfgoedzoeker/config-schema';
import { getIcon, isRegisteredIcon } from '@erfgoedzoeker/icon-registry';
import { clsx } from 'clsx';
import { useRef } from 'react';

type IconProps = {
  icon: IconKey;
};

function Icon({ icon }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex [&_svg]:size-5"
      dangerouslySetInnerHTML={{ __html: getIcon(icon) }}
    />
  );
}

export function IconSelectWidget({
  id,
  label,
  value,
  options,
  required,
  disabled,
  readonly,
  onBlur,
  onChange,
  onFocus,
}: WidgetProps) {
  const details = useRef<HTMLDetailsElement>(null);
  const selectedIcon = isRegisteredIcon(value) ? value : undefined;
  const iconOptions = (options.enumOptions ?? []).flatMap((option) =>
    isRegisteredIcon(option.value)
      ? [{ icon: option.value, label: option.label }]
      : [],
  );
  const selectableIconOptions: Array<{
    icon: IconKey | undefined;
    label: string;
  }> = required
    ? iconOptions
    : [{ icon: undefined, label: 'No icon' }, ...iconOptions];
  const isDisabled = disabled || readonly;

  function selectIcon(icon: IconKey | undefined) {
    const nextValue = icon ?? options.emptyValue;
    onChange(nextValue);
    if (details.current) {
      details.current.open = false;
      details.current.querySelector('summary')?.focus();
    }
  }

  return (
    <details ref={details} className="w-full">
      <summary
        id={id}
        className={clsx(
          'btn btn-outline w-full justify-between',
          isDisabled && 'btn-disabled',
        )}
        aria-disabled={isDisabled}
        aria-label={`${label}: ${selectedIcon ?? 'no icon'}`}
        onBlur={() => onBlur(id, value)}
        onClick={(event) => isDisabled && event.preventDefault()}
        onFocus={() => onFocus(id, value)}
        onKeyDown={(event) => {
          if (isDisabled && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
          }
        }}
      >
        {selectedIcon ? (
          <Icon icon={selectedIcon} />
        ) : (
          <span aria-hidden></span>
        )}
        <span aria-hidden="true">▾</span>
      </summary>
      <div className="absolute z-10 w-48 mt-1 grid grid-cols-4 gap-1 rounded-box bg-base-100 p-2 shadow-lg">
        {selectableIconOptions.map(({ icon, label: iconLabel }) => {
          const isSelected = selectedIcon === icon;

          return (
            <button
              type="button"
              key={icon ?? 'none'}
              className={clsx(
                'btn btn-square btn-ghost',
                isSelected && 'btn-active',
              )}
              aria-label={iconLabel}
              aria-pressed={isSelected}
              title={iconLabel}
              onClick={() => selectIcon(icon)}
            >
              {icon && <Icon icon={icon} />}
            </button>
          );
        })}
      </div>
    </details>
  );
}
