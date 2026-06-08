# Security Specifications & Dirty Dozen Payloads

## Data Invariants
1. **User Ownership Consistency**: A user cannot modify or write to another user's profile documents, pantry states, or cooked history records.
2. **Post Authorship Integrity**: A user must only create or update community posts where the author `uid` matches the authenticated `request.auth.uid`.
3. **Immutability of Core Metadata**: Creation timestamps (`createdAt`) and primary owner affiliations must be strictly immutable after creation.
4. **Range / Value Boundaries**: Ratings in cooked history logs cannot be less than 1 or greater than 5 stars.
5. **No System Claims Overwrite**: Users cannot self-appoint administrative permissions or bypass restrictions using client-side SDK overrides.
6. **Query Enforced Security**: Collection reading/listing must only yield documents owned by the active user, or public posts, avoiding client-side filtering reliance.

---

## The "Dirty Dozen" Exploit Payloads (Tested to return PERMISSION_DENIED)

### 1. User Profile: Identity Spoofing (Write to another user file)
- **Path**: `/users/victim_user_123`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Payload**:
```json
{
  "uid": "victim_user_123",
  "name": "Attacker Impersonator",
  "avatarEmoji": "👨‍🍳",
  "avatarBg": "bg-blue-500",
  "isGuest": false,
  "language": "es"
}
```

### 2. User Profile: Path ID Poisoning (Doc ID with invalid characters)
- **Path**: `/users/illegal#$*@%-long-id`
- **Auth**: `request.auth.uid = "illegal#$*@%-long-id"`
- **Payload**:
```json
{
  "uid": "illegal#$*@%-long-id",
  "name": "Poison ID Chef",
  "avatarEmoji": "👨‍🍳",
  "avatarBg": "bg-blue-500",
  "isGuest": false,
  "language": "es"
}
```

### 3. User Profile: Spoofing of Internal UID Field
- **Path**: `/users/attacker_456`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Payload**:
```json
{
  "uid": "victim_user_123",
  "name": "Attacker Hijacking ID",
  "avatarEmoji": "👨‍🍳",
  "avatarBg": "bg-blue-500",
  "isGuest": false,
  "language": "es"
}
```

### 4. User Profile: Temporal Integrity Overwrite
- **Path**: `/users/attacker_456`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Payload**:
```json
{
  "uid": "attacker_456",
  "name": "Attacker Chef",
  "avatarEmoji": "👨‍🍳",
  "avatarBg": "bg-blue-500",
  "isGuest": false,
  "language": "es",
  "createdAt": "2030-12-25T00:00:00Z"
}
```

### 5. User Profile: Overwriting Immutable Creation Time on Update
- **Path**: `/users/attacker_456`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Action**: Update
- **Payload**: Modifies `createdAt` value to a different value than the database's existing value.

### 6. Cooked History: Unauthorized History Creation (Write to another user subcollection)
- **Path**: `/users/victim_user_123/cookedHistory/hist_789`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Payload**:
```json
{
  "id": "hist_789",
  "recipeId": "tortilla",
  "name": "Tortilla",
  "date": "Hoy",
  "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "rating": 5,
  "favorite": true,
  "createdAt": "2026-06-01T08:00:00Z"
}
```

### 7. Cooked History: Path ID Poisoning
- **Path**: `/users/attacker_456/cookedHistory/invalid_chars!!!!`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Payload**:
```json
{
  "id": "invalid_chars!!!!",
  "recipeId": "tortilla",
  "name": "Tortilla",
  "date": "Hoy",
  "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "rating": 5,
  "favorite": true,
  "createdAt": "request.time"
}
```

### 8. Cooked History: Resource Value Poisoning (Rating Out of Bounds)
- **Path**: `/users/attacker_456/cookedHistory/hist_111`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Payload**:
```json
{
  "id": "hist_111",
  "recipeId": "tortilla",
  "name": "Tortilla",
  "date": "Hoy",
  "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "rating": 99,
  "favorite": true,
  "createdAt": "request.time"
}
```

### 9. Community Post: Impersonating Recipe Creator
- **Path**: `/communityPosts/post_123`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Payload**:
```json
{
  "id": "post_123",
  "uid": "victim_user_123",
  "username": "Victim Chef",
  "avatarEmoji": "👨‍🍳",
  "avatarBg": "bg-blue-500",
  "text": "Check out my new kitchen!",
  "likes": 0,
  "likedByUids": [],
  "createdAt": "request.time"
}
```

### 10. Community Post: Client-Driven Like Inflation
- **Path**: `/communityPosts/post_123`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Action**: Update
- **Payload**: Increases `likes` count to `9999` without attaching attacker's uid to `likedByUids`, or changes keys they are unauthorized to touch.

### 11. Profile Scraping (Blanket reads on unowned user profiles)
- **Path**: `/users/victim_user_123`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Action**: Read (Unauthenticated / other user reads profile document directly. Handled by strictly restricting reads to `isOwner(userId)`).

### 12. Community Post: Flooding Attack (Payload size overflow)
- **Path**: `/communityPosts/post_123`
- **Auth**: `request.auth.uid = "attacker_456"`
- **Payload**: Post `text` contains a character array exceeding `5000` characters.
