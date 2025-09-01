/**
 * Project visibility enumeration
 */
export const VISIBILITY = {
  private: 'private',
  public: 'public',
} as const;

export type Visibility = typeof VISIBILITY[keyof typeof VISIBILITY];

export const VISIBILITIES = Object.values(VISIBILITY);
